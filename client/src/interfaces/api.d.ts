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




  }

}