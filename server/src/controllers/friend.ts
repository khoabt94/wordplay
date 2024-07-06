import { NextFunction, Response } from "express"
import catchAsync from "../utils/catch-async"
import CurrentUsersOnline from "../socket/user-online"
import { TypedRequest } from "../interfaces/request"
import { Body } from "../interfaces/body"
import { User } from "../models"
import { IUser } from "../interfaces/user"
import { FriendRequest } from "../models/friend-request"
import { CustomError } from "../utils/error"

const getFriends = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const friends = await User.findById(user._id).populate('friends', '-createdAt -__v -updatedAt -email')

  res.status(200).json({
    status: 'success',
    data: {
      friends
    }
  })
})

const deleteFriend = catchAsync(async (req: TypedRequest<Body.DeleteFriend, {}>, res: Response, next: NextFunction) => {
  const { user, body: { friend_id } } = req

  if (!friend_id) {
    return next(new CustomError({
      message: "Please provide friend id",
      statusCode: 400
    }))
  }

  const newFriends = (user as IUser).friends.filter(friend => String(friend.friend_id) !== friend_id)
  const updatedUser = await User.findByIdAndUpdate(user._id, { friends: newFriends }, { new: true })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})


const getFriendRequestsSent = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const sent_friend_requests = await FriendRequest.find({ sender: user._id }).populate('receiver_id', '-__v -updatedAt -email')

  res.status(200).json({
    status: 'success',
    data: {
      sent_friend_requests
    }
  })
})

const getReceivedFriendRequests = catchAsync(async (req: TypedRequest<{}, {}>, res: Response, _next: NextFunction) => {
  const { user } = req
  const received_friend_requests = await FriendRequest.find({ receiver: user._id }).populate('sender', '-__v -updatedAt -email')

  res.status(200).json({
    status: 'success',
    data: {
      received_friend_requests
    }
  })
})

const sendFriendRequest = catchAsync(async (req: TypedRequest<Body.SendFriendRequest, {}>, res: Response, next: NextFunction) => {
  const { user, body: { receiver_id } } = req

  if (!receiver_id) {
    return next(new CustomError({
      message: "Please provide receiver id",
      statusCode: 400
    }))
  }

  const newFriendRequest = await FriendRequest.create({
    receiver: receiver_id,
    sender: user._id
  })

  res.status(200).json({
    status: 'success',
    data: {
      friend_request: newFriendRequest
    }
  })
})

const replyReceivedFriendRequests = catchAsync(async (req: TypedRequest<Body.ReplyFriendRequest, {}>, res: Response, next: NextFunction) => {
  const { user: receiver, body: { is_accepted, request_id } } = req

  if (!request_id || !is_accepted) {
    return next(new CustomError({
      message: "Please provide neccessary information",
      statusCode: 400
    }))
  }

  const friendRequest = await FriendRequest.findById(request_id)
  if (!friendRequest) {
    return next(new CustomError({
      message: "Friend request not found",
      statusCode: 404
    }))
  }
  friendRequest.isAccepted = is_accepted
  await friendRequest.save()

  if (is_accepted) {
    await User.findByIdAndUpdate(receiver._id, {
      friends: [...(receiver as IUser).friends, friendRequest.sender]
    }
    )
    const sender = await User.findById(friendRequest.sender)
    if (sender) {
      sender.friends = [...(sender as IUser).friends, receiver._id]
    }
    await friendRequest.save()
  }

  res.status(200).json({
    status: 'success',
  })
})

const deleteFriendRequest = catchAsync(async (req: TypedRequest<Body.DeleteFriendRequest, {}>, res: Response) => {
  const { user, body: { receiver_id } } = req
  await FriendRequest.deleteOne({
    receiver_id,
    sender_id: user._id
  })

  res.status(200).json({
    status: 'success',
  })
})

export const friendControllers = {
  getFriends,
  deleteFriend,
  getFriendRequestsSent,
  sendFriendRequest,
  deleteFriendRequest,
  getReceivedFriendRequests,
  replyReceivedFriendRequests,
}