import {DateTime} from 'luxon';
import {v4 as uuidv4} from 'uuid';
import {getRandomHabits} from './random-utils';
import {MAX_MONTHS, NUM_DEFAULT_HABITS} from '../data/settings';


const computeMonthRows = dtObj => {
  const yr = dtObj.year;
  const mon = dtObj.month;
  const dt = DateTime.fromObject ({year: yr, month: mon});

  const monthRows = [];
  for (let dy = 1; dy <= dt.daysInMonth; dy++) {
    const dayStr = DateTime.fromObject ({
      year: yr,
      month: mon,
      day: dy,
    }).toFormat ('ccc dd');
    monthRows.push (dayStr);
  }
  return monthRows;
};

const computeInitialTables = startMonthObj => {
  const start = DateTime.fromObject (startMonthObj);
  const tables = [];

  tables.push ({
    id: uuidv4 (),
    year: start.year,
    month: start.monthLong,
    label: `${start.monthLong} ${start.year}`,
    rows: computeMonthRows (start),
    habits: getRandomHabits (NUM_DEFAULT_HABITS),
    tags: ['first'],
  });

  for (let offset = 1; offset < MAX_MONTHS; offset++) {
    const currentDt = start.plus ({months: offset});
    tables.push ({
      id: uuidv4 (),
      year: currentDt.year,
      month: currentDt.monthLong,
      label: `${currentDt.monthLong} ${currentDt.year}`,
      rows: computeMonthRows (currentDt),
      habits: getRandomHabits (NUM_DEFAULT_HABITS),
    });
  }

  return tables;
};

const transformTables = (tables, transform) => {
  // find and change the given habit
  const tablesCopy = tables.map (tbl => {
    let newTbl = {
      id: tbl.id,
      year: tbl.year,
      month: tbl.month,
      label: tbl.label,
      rows: tbl.rows,
      habits: tbl.habits,
      tags: tbl.tags,
    };
    return transform(newTbl);
  });
  return tablesCopy;
}

export {computeMonthRows, computeInitialTables, transformTables};
