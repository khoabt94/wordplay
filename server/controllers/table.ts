import { Response } from "express"
import TypedRequest from "../interfaces/request"
import CurrentTables from "../socket/table"
import catchAsync from "../utils/catch-async"

const getTables = catchAsync(async (req: TypedRequest<{}, {}>, res: Response) => {
  const { user } = req
  const currentTables = CurrentTables.tables.filter(u => !u.opponents.find(opp => opp.user_id === String(user._id))).map(table => ({ ...table, opponents: table.opponents.map(user => user.user) }))

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