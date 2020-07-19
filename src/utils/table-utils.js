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

export {computeMonthRows, computeInitialTables};
