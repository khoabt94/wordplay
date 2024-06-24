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

  interface updateMyProfile {
    name?: string
    avatar?: string
    banner?: string
  }


}