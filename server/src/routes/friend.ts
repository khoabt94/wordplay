import { authControllers, friendControllers, userControllers } from '../controllers'
import express from 'express'

const friendRouter = express.Router()

friendRouter
    .route('/my-friend')
    .get(authControllers.verify, friendControllers.getFriends)
    .delete(authControllers.verify, friendControllers.deleteFriend)

friendRouter
    .route('/received-friend-request')
    .get(authControllers.verify, friendControllers.getReceivedFriendRequests)
    .patch(authControllers.verify, friendControllers.replyReceivedFriendRequests)

friendRouter
    .route('/sent-friend-request')
    .get(authControllers.verify, friendControllers.getFriendRequestsSent)
    .post(authControllers.verify, friendControllers.sendFriendRequest)
    .delete(authControllers.verify, friendControllers.deleteFriendRequest)

export { friendRouter }