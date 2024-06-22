import { User } from "./user"

export namespace Table {
  interface Detail {
    opponents: User.Detail[]
    game_mode: MatchMode
    game_language: MatchLanguage
    table_id: string
  }
}