import PropTypes from "prop-types"
import React from "react"
import MonthTable from './month-table';

import "./month-tables.css"

const isMonthOpen = (month, openMonth) => {
  return month.label.toLowerCase () === openMonth.label.toLowerCase ();
};

const getMonthTables = (months, iconMode, openMonth, actions) => {
  return months.map(function (month) {
    return (<MonthTable
      month={month}
      iconMode={iconMode}
      isOpen={isMonthOpen(month, openMonth)}
      actions={actions}
      key={month.label}
    />);
  });
}

const MonthTables = ({
  months,
  iconMode,
  openMonth,
  actions,
}) => (
  <div className="month-tables">
    {getMonthTables(months, iconMode, openMonth, actions)}
  </div>
)

MonthTables.propTypes = {
  months: PropTypes.array,
  openMonth: PropTypes.object,
  actions: PropTypes.object,
}

MonthTables.defaultProps = {
  months: [],
  openMonth: {},
  actions: {},
}

export default MonthTables;
