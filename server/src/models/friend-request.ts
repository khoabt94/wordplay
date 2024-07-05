import { Model, Schema, model } from "mongoose";
import { IFriendRequest, IFriendRequestMethods, IFriendRequestVirtuals } from "../interfaces/friend-request";

type TFriendRequestModel = Model<IFriendRequest, {}, IFriendRequestMethods, IFriendRequestVirtuals>

const FriendRequestSchema = new Schema<IFriendRequest, TFriendRequestModel, IFriendRequestMethods, IFriendRequestVirtuals>({
  receiver: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide receiver id']
  },
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please provide sender id']
  },
  isAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})


export const FriendRequest: TFriendRequestModel = model<IFriendRequest, TFriendRequestModel>("FriendRequest", FriendRequestSchema);
