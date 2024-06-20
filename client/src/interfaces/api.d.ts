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


  }

}