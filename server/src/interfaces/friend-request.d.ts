import { Schema } from "mongoose";

export interface IFriendRequest {
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    createdAt?: Date
    isAccepted: boolean
    _id: Schema.Types.ObjectId
}

export interface IFriendRequestMethods {
}

export interface IFriendRequestVirtuals {

}