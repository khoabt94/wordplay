import { User } from "./user"

export namespace Table {
  interface Detail {
    opponents: {
      socket_id: string
      user_id: string
      user: IUser
    }[]
    game_mode: MatchMode
    game_language: MatchLanguage
    table_id: string
  }
}