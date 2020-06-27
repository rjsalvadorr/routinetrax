import PropTypes from "prop-types"
import React from "react"
import MonthDrawer from './month-drawer';

import "./month-drawers.css"

const isMonthOpen = (month, openMonth) => {
  return month.label.toLowerCase () === openMonth.label.toLowerCase ();
};

const getMonthDrawers = (months, openMonth, openHandler) => {
  return months.map(function (month) {
    return (<MonthDrawer
      month={month}
      isOpen={isMonthOpen(month, openMonth)}
      openHandler={openHandler}
      key={month.label}
    />);
  });
}

const MonthDrawers = ({
  months,
  openMonth,
  openHandler,
}) => (
  <div className="month-drawers">
    {getMonthDrawers(months, openMonth, openHandler)}
  </div>
)

MonthDrawers.propTypes = {
  months: PropTypes.array,
  openMonth: PropTypes.object,
}

MonthDrawers.defaultProps = {
  months: [],
  openMonth: {},
}

export default MonthDrawers;
