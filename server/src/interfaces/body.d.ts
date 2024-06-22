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

  interface UpdateInfoMe {
    name?: string
    avatar?: string
    banner?: string
  }


}