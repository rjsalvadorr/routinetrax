import PropTypes from "prop-types"
import React from "react"
import MonthDrawer from './month-drawer';

import "./month-drawers.css"

const isMonthOpen = (month, openMonth) => {
  return month.label.toLowerCase () === openMonth.label.toLowerCase ();
};

const getMonthDrawers = (months, openMonth, openHandler, onAddHabit, onDescChanged) => {
  return months.map(function (month) {
    return (<MonthDrawer
      month={month}
      isOpen={isMonthOpen(month, openMonth)}
      openHandler={openHandler}
      key={month.label}
      onAddHabit={onAddHabit}
      onDescChanged={onDescChanged}
    />);
  });
}

const MonthDrawers = ({
  months,
  openMonth,
  openHandler,
  onAddHabit,
  onDescChanged,
}) => (
  <div className="month-drawers">
    {getMonthDrawers(months, openMonth, openHandler, onAddHabit, onDescChanged)}
  </div>
)

MonthDrawers.propTypes = {
  months: PropTypes.array,
  openMonth: PropTypes.object,
  openHandler: PropTypes.func,
  onAddHabit: PropTypes.func,
  onDescChanged: PropTypes.func,
}

MonthDrawers.defaultProps = {
  months: [],
  openMonth: {},
  openHandler: () => {},
  onAddHabit: () => {},
  onDescChanged: () => {},
}

export default MonthDrawers;
