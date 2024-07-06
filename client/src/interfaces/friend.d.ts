import { User } from "./user"

export namespace Friend {
  interface Detail {
    friend_from: string
    friend_info: User.Detail
  }
  interface FriendRequestDetail {
    sender: User.Detail
    receiver: User.Detail
    createdAt?: string
    isAccepted: boolean
    _id: string
  }
}