import { NextFunction, Response } from "express"
import catchAsync from "../utils/catch-async"
import CurrentUsersOnline from "../socket/user-online"
import { TypedRequest } from "../interfaces/request"
import { Body } from "../interfaces/body"
import { User } from "../models"
import { IUser } from "../interfaces/user"
import { FriendRequest } from "../models/friend-request"
import { CustomError } from "../utils/error"
import { io } from "../../index"
import { ServerToClientEventsKeys } from "../constants"

const getFriends = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const populatedUser = await User.findById(user._id).populate('friends.friend_info', '-createdAt -__v -updatedAt -email -friends')

  res.status(200).json({
    status: 'success',
    data: {
      friends: populatedUser?.friends
    }
  })
})

const deleteFriend = catchAsync(async (req: TypedRequest<Body.DeleteFriend, {}>, res: Response, next: NextFunction) => {
  const { user: deleter, params: { friend_id } } = req

  if (!friend_id) {
    return next(new CustomError({
      message: "Please provide friend id",
      statusCode: 400
    }))
  }
  const deletee = await User.findById(friend_id)
  if (!deletee) {
    return next(new CustomError({
      message: "Not valid friend",
      statusCode: 400
    }))
  }

  const newDeleterFriends = (deleter as IUser).friends.filter(friend => String(friend.friend_info) !== String(friend_id))
  await User.findByIdAndUpdate(deleter._id, { friends: newDeleterFriends })

  const newDeleteeFriends = (deletee as IUser).friends.filter(friend => {
    return String(friend.friend_info) !== String(deleter._id)
  })

  await User.findByIdAndUpdate(friend_id, { friends: newDeleteeFriends })

  res.status(200).json({
    status: 'success',
  })
})


const getFriendRequestsSent = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const sent_friend_requests = await FriendRequest.find({ sender: user._id }).populate('receiver', '-__v -updatedAt -email -friends -createdAt -friends')

  res.status(200).json({
    status: 'success',
    data: {
      sent_friend_requests
    }
  })
})

const getReceivedFriendRequests = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const received_friend_requests = await FriendRequest.find({ receiver: user._id }).populate('sender', '-__v -updatedAt -email -friends -createdAt')

  res.status(200).json({
    status: 'success',
    data: {
      received_friend_requests
    }
  })
})

const sendFriendRequest = catchAsync(async (req: TypedRequest<Body.SendFriendRequest, {}>, res: Response, next: NextFunction) => {
  const { user: sender, body: { email } } = req

  if (!email) {
    return next(new CustomError({
      message: "Please provide receiver email",
      statusCode: 400
    }))
  }

  const receiver = await User.findOne({ email })
  if (!receiver) {
    return next(new CustomError({
      message: "Not found user with this email",
      statusCode: 404
    }))
  }

  // already sent request or received request
  const checkExistFriendRequest = await FriendRequest.findOne({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ]
  })

  if (checkExistFriendRequest) {
    return next(new CustomError({
      message: "You already sent/received friend request to/from this person",
      statusCode: 404
    }))
  }


  // already friend
  const checkExistFriend = (sender as IUser).friends.some(friend => String(friend.friend_info) === String(receiver._id))
  if (checkExistFriend) {
    return next(new CustomError({
      message: "This email belong to one of your current friend",
      statusCode: 400
    }))
  }


  const newFriendRequest = await FriendRequest.create({
    receiver: receiver._id,
    sender: sender._id
  })
  const populatedNewFriendRequest = await newFriendRequest.populate('sender', '-__v -updatedAt -email -friends -createdAt')

  // Handle socket to receiver
  const existReceiverOnline = CurrentUsersOnline.findUser(String(receiver._id))
  if (existReceiverOnline) {
    io.to(existReceiverOnline.socket_id).emit(ServerToClientEventsKeys.friend_request_receive, { friendRequest: populatedNewFriendRequest })
  }

  res.status(200).json({
    status: 'success',
    data: {
      friend_request: newFriendRequest
    }
  })
})

const replyReceivedFriendRequest = catchAsync(async (req: TypedRequest<Body.ReplyReceivedFriendRequest, {}>, res: Response, next: NextFunction) => {
  const {
    user: receiver,
    body: { is_accepted, },
    params: { friend_request_id }
  } = req

  if (!friend_request_id || !is_accepted) {
    return next(new CustomError({
      message: "Please provide neccessary information",
      statusCode: 400
    }))
  }

  // Handle delete friendRequest
  const friendRequest = await FriendRequest.findById(friend_request_id).populate('receiver', '-__v -updatedAt -email -friends -createdAt')

  if (!friendRequest) {
    return next(new CustomError({
      message: "Friend request not found",
      statusCode: 404
    }))
  }
  await friendRequest.deleteOne()

  // Handle update friends list of sender and receiver
  const sender = await User.findById(friendRequest.sender)
  if (!sender) {
    return next(new CustomError({
      message: "Sender friend request not found",
      statusCode: 404
    }))
  }

  if (is_accepted) {
    await User.findByIdAndUpdate(receiver._id, {
      friends: [
        ...(receiver as IUser).friends,
        {
          friend_info: friendRequest.sender,
          friend_from: new Date()
        }
      ]
    }
    )
    sender.friends = [
      ...(sender as IUser).friends,
      {
        friend_info: friendRequest.receiver,
        friend_from: new Date()
      }
    ]
    await sender.save()
  }

  // Handle socket to receiver and sender
  const existSenderOnline = CurrentUsersOnline.findUser(String(sender._id))
  if (existSenderOnline) {
    const event: ServerToClientEventsKeys = is_accepted ? ServerToClientEventsKeys.friend_request_accept : ServerToClientEventsKeys.friend_request_decline
    io.to(existSenderOnline.socket_id).emit(event, { friendRequest })
  }

  res.status(200).json({
    status: 'success',
  })
})

const deleteSentFriendRequest = catchAsync(async (req: TypedRequest<{}, {}>, res: Response) => {
  const { friend_request_id } = req.params
  await FriendRequest.findByIdAndDelete(friend_request_id)

  res.status(200).json({
    status: 'success',
  })
})

export const friendControllers = {
  getFriends,
  deleteFriend,
  getFriendRequestsSent,
  sendFriendRequest,
  deleteSentFriendRequest,
  getReceivedFriendRequests,
  replyReceivedFriendRequest,
}