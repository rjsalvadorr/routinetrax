import PropTypes from "prop-types"
import React from "react"
import RoutineList from "./routine-list"

import "./month-list.css"

const MonthList = ({ month, iconMode, actions }) => {
  return (
    <div className="month-list">
      <header className="month-list__header">
        <span className="month-list__label">{month.label}</span>
      </header>
      <main className="month-list__content">
        <RoutineList month={month} iconMode={iconMode} actions={actions} />
      </main>
    </div>
  )
}

MonthList.propTypes = {
  month: PropTypes.object,
  actions: PropTypes.object,
}

MonthList.defaultProps = {
  month: { label: "Junetober 3561" },
  actions: {},
}

export default MonthList
