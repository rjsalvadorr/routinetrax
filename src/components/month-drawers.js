import PropTypes from "prop-types"
import React from "react"
import MonthDrawer from './month-drawer';

import "./month-drawers.css"

const isMonthOpen = (month, openMonth) => {
  return month.label.toLowerCase () === openMonth.label.toLowerCase ();
};

const getMonthDrawers = (months, openMonth, actions) => {
  return months.map(function (month) {
    return (<MonthDrawer
      month={month}
      isOpen={isMonthOpen(month, openMonth)}
      actions={actions}
      key={month.label}
    />);
  });
}

const MonthDrawers = ({
  months,
  openMonth,
  actions,
}) => (
  <div className="month-drawers">
    {getMonthDrawers(months, openMonth, actions)}
  </div>
)

MonthDrawers.propTypes = {
  months: PropTypes.array,
  openMonth: PropTypes.object,
  actions: PropTypes.object,
}

MonthDrawers.defaultProps = {
  months: [],
  openMonth: {},
  actions: {},
}

export default MonthDrawers;
