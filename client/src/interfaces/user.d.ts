
export namespace User {
  interface Detail {
    name: string;
    email: string;
    avatar: string;
    banner: string
    elo: number
    _id: string
    friends: User.Detail[]
  }

  interface SimpleDetail {
    name: string;
    avatar: string;
    banner: string
    elo: number
    _id: string
  }
}