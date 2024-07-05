export namespace Body {
  interface Signup {
    name: string
    email: string
    password: string
  }

  interface Login {
    email: string
    password: string
  }

  interface UpdateMyProfile {
    name?: string
    avatar?: string
    banner?: string
  }

  interface DeleteFriend {
    friend_id: string
  }

  interface SendFriendRequest {
    receiver_id: string
  }

  interface DeleteFriendRequest {
    receiver_id: string
  }

  interface ReplyFriendRequest {
    request_id: string
    is_accepted: boolean
  }

}