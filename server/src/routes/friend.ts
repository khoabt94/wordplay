import { authControllers, friendControllers, userControllers } from '../controllers'
import express from 'express'

const friendRouter = express.Router()

friendRouter
    .route('/my-friend')
    .get(authControllers.verify, friendControllers.getFriends)

friendRouter
    .route('/my-friend/:friend_id')
    .delete(authControllers.verify, friendControllers.deleteFriend)

friendRouter
    .route('/received-friend-request')
    .get(authControllers.verify, friendControllers.getReceivedFriendRequests)

friendRouter
    .route('/received-friend-request/:friend_request_id')
    .patch(authControllers.verify, friendControllers.replyReceivedFriendRequest)

friendRouter
    .route('/sent-friend-request')
    .get(authControllers.verify, friendControllers.getFriendRequestsSent)
    .post(authControllers.verify, friendControllers.sendFriendRequest)

friendRouter
    .route('/sent-friend-request/:friend_request_id')
    .delete(authControllers.verify, friendControllers.deleteSentFriendRequest)

export { friendRouter }