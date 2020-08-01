import { DateTime } from "luxon"
// import {v4 as uuidv4} from 'uuid';
import { getInitialRoutines } from "./random-utils"
import { MAX_MONTHS, NUM_DEFAULT_HABITS } from "../data/settings"
import MonthSheet from "../models/month-sheet"

const computeMonthRows = dtObj => {
  const yr = dtObj.year
  const mon = dtObj.month
  const dt = DateTime.fromObject({ year: yr, month: mon })

  const monthRows = []
  for (let dy = 1; dy <= dt.daysInMonth; dy++) {
    const dayStr = DateTime.fromObject({
      year: yr,
      month: mon,
      day: dy,
    }).toFormat("ccc dd")
    monthRows.push(dayStr)
  }
  return monthRows
}

const computeInitialTables = startMonthObj => {
  const start = DateTime.fromObject(startMonthObj)
  const tables = []

  tables.push(
    new MonthSheet(
      null,
      start.year,
      start.monthLong,
      computeMonthRows(start),
      getInitialRoutines(NUM_DEFAULT_HABITS),
      ["first"]
    )
  )

  for (let offset = 1; offset <= MAX_MONTHS; offset++) {
    const currentDt = start.plus({ months: offset })
    tables.push(
      new MonthSheet(
        null,
        currentDt.year,
        currentDt.monthLong,
        computeMonthRows(currentDt),
        getInitialRoutines(NUM_DEFAULT_HABITS)
      )
    )
  }

  return tables
}

const transformTables = (tables, transform) => {
  // find and change the given habit
  const tablesCopy = tables.map(tbl => {
    let newTbl = new MonthSheet(
      tbl.id,
      tbl.year,
      tbl.month,
      tbl.rows,
      tbl.habits,
      tbl.tags
    )
    return transform(newTbl)
  })
  return tablesCopy
}

export { computeMonthRows, computeInitialTables, transformTables }
