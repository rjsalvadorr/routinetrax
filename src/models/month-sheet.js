import { v4 as uuidv4 } from "uuid"

export default class MonthSheet {
  constructor(
    year = 4753,
    month = "Blorgember",
    rows = [],
    habits = [],
    tags = []
  ) {
    this.id = uuidv4()
    this.year = year
    this.month = month
    this.label = `${month} ${year}`
    this.rows = rows
    this.habits = habits
    this.tags = tags
  }
}
