import PropTypes from "prop-types"
import React from "react"
import MonthList from './month-list';

import "./month-lists.css"

const isMonthOpen = (month, openMonth) => {
  return month.label.toLowerCase () === openMonth.label.toLowerCase ();
};

const getMonthLists = (months, iconMode, actions) => {
  return months.map(function (month) {
    return (<MonthList
      month={month}
      iconMode={iconMode}
      actions={actions}
      key={month.label}
    />);
  });
}

const MonthLists = ({
  months,
  iconMode,
  actions,
}) => (
  <div className="month-lists">
    {getMonthLists(months, iconMode, actions)}
  </div>
)

MonthLists.propTypes = {
  months: PropTypes.array,
  actions: PropTypes.object,
}

MonthLists.defaultProps = {
  months: [],
  actions: {},
}

export default MonthLists;
