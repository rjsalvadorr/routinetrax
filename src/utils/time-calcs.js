import { DateTime } from 'luxon';

const NUM_TABLES = 6; // must be an even number!

const computeMonthRows = (dtObj) => {
  const yr = dtObj.year;
  const mon = dtObj.month;
  const dt = DateTime.fromObject({ year: yr, month: mon });

  const monthRows = [];
  for (let dy = 1; dy <= dt.daysInMonth; dy++) {
      const dayStr = DateTime.fromObject({ year: yr, month: mon, day: dy }).toFormat('ccc dd');
      monthRows.push(dayStr);
  }
  return monthRows;
}

const computeTables = (startMonthObj) => {
  const start = DateTime.fromObject(startMonthObj);
  const tables = [];

  tables.push({
      year: start.year,
      month: start.monthLong,
      rows: computeMonthRows(start)
  });
  for (let offset = 1; offset < NUM_TABLES; offset++) {
      const currentDt = start.plus({ months: offset });
      tables.push({
          year: currentDt.year,
          month: currentDt.monthLong,
          rows: computeMonthRows(currentDt)
      });
  }
  return tables;
}

export {
  computeMonthRows,
  computeTables,
  NUM_TABLES,
}
