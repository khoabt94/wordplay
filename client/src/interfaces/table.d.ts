import { User } from "./user"

export namespace Table {
  interface Detail {
    players: User.Detail[]
    match_mode: MatchMode
    match_language: MatchLanguage
    table_id: string
  }
}