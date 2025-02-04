import type { MonthlyCreation } from '../models/monthlyCreation'

export type StatisticsDTO = {
  shelter: MonthlyCreation[]
  adoption: MonthlyCreation[]
}
