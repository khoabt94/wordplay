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
    email: string
  }

  interface DeleteSentFriendRequest {
    friend_request_id: string
  }

  interface ReplyReceivedFriendRequest {
    is_accepted: boolean
  }

}