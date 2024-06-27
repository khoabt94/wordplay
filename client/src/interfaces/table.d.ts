import { User } from "./user"

export namespace Table {
  interface Detail {
    players: {
      user: User.Detail,
      user_id: string
    }[]
    match_mode: MatchMode
    match_language: MatchLanguage
    table_id: string
  }
}