import { Friend, FriendRequest } from "./friend"
import { Match } from "./match"
import { Table } from "./table"
import { User } from "./user"

export namespace Api {

  namespace AuthApi {

    interface SignUpPayload {
      name: string
      email: string
      password: string
    }

    interface SignupResponse {
      user: User.Detail,
      access_token: string
    }

    interface LoginPayload {
      email: string
      password: string
    }

    interface LoginResponse {
      user: User.Detail,
      access_token: string
    }

    interface RefreshTokenResponse {
      access_token: string
    }


  }

  namespace UserApi {

    interface GetMyProfileResponse {
      user: User.Detail,
    }

    interface GetMyMatchesResponse {
      matches: Match.Detail[],
    }

    interface GetUsersOnlineResponse {
      users: User.Detail[],
    }


    interface UpdateMyProfilePayload {
      name?: string
      avatar?: string
      banner?: string
    }
    interface UpdateMyProfileResponse {
      user: User.Detail,
    }

  }

  namespace TableApi {

    interface GetTablesResponse {
      tables: Table.Detail[],
    }



  }

  namespace FriendApi {

    interface SendFriendRequest {
      email: string
    }

    interface DeleteFriendParam {
      friend_id: string
    }

    interface DeleteSentFriendRequestParam {
      friend_request_id: string
    }

    interface ReplyReceivedFriendRequestsParam {
      friend_request_id: string
      is_accepted: boolean
    }

    interface GetFriendsResponse {
      friends: Friend.Detail[]
    }

    interface GetSentFriendRequestResponse {
      sent_friend_requests: Friend.FriendRequestDetail[]
    }

    interface GetReceivedFriendRequestResponse {
      received_friend_requests: Friend.FriendRequestDetail[]
    }

  }
}