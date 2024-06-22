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

    interface GetInfoMeResponse {
      user: User.Detail,
    }

    interface GetUsersOnlineResponse {
      users: User.Detail[],
    }


    interface UpdateInfoMePayload {
      name?: string
      avatar?: string
      banner?: string
    }
    interface UpdateInfoMeResponse {
      user: User.Detail,
    }

  }


  namespace TableApi {

    interface GetTablesResponse {
      tables: Table.Detail[],
    }



  }

}