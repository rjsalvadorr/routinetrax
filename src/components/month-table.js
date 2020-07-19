import PropTypes from 'prop-types';
import React from 'react';
import MonthHabits from './month-habits';

import './month-table.css';

const getClassName = isOpen => {
  let className = 'month-table';
  return isOpen
    ? className.concat (' month-table--open')
    : className.concat (' month-table--closed');
};

const getToggleIcon = (isOpen, onOpen, month) => {
  if (isOpen) {
    return (<span className="toggle-button toggle-button--open"></span>);
  }
  return (<span className="toggle-button toggle-button--closed" onClick={(evt) => { onOpen(month, evt) }}></span>);
};

const MonthTable = ({
  month,
  iconMode,
  isOpen,
  actions,
}) => (
  <div className={getClassName (isOpen)}>
    <header className="month-table__header">
      {getToggleIcon (isOpen, actions.onOpen, month)}{month.label}
    </header>
    <main className="month-table__content">
      <MonthHabits month={month} iconMode={iconMode} onAddHabit={actions.onAddHabit} onDescChanged={actions.onDescChanged}/>
    </main>
  </div>
);

MonthTable.propTypes = {
  month: PropTypes.object,
  isOpen: PropTypes.bool,
  actions: PropTypes.object,
};

MonthTable.defaultProps = {
  month: {label: 'Junetober 3561'},
  isOpen: false,
  actions: {},
};

export default MonthTable;
