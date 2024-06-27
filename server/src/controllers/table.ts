import { Response } from "express"
import CurrentTables from "../socket/table"
import catchAsync from "../utils/catch-async"
import { TypedRequest } from "../interfaces/request"

const getTables = catchAsync(async (req: TypedRequest<{}, {}>, res: Response) => {
  const { user } = req
  const currentTables = CurrentTables.tables.filter(u => !u.detail.players.find(opp => opp.user_id === String(user._id))).map(table => ({ ...table, players: table.detail.players.map(user => user.user) }))

  res.status(200).json({
    status: 'success',
    data: {
      tables: currentTables
    }
  })
})

export const tableControllers = {
  getTables,
}