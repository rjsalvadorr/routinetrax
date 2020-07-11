import PropTypes from 'prop-types';
import React from 'react';
import MonthHabits from './month-habits';

import './month-drawer.css';

const getClassName = isOpen => {
  let className = 'month-drawer';
  return isOpen
    ? className.concat (' month-drawer--open')
    : className.concat (' month-drawer--closed');
};

const getToggleIcon = (isOpen, openHandler, month) => {
  if (isOpen) {
    return (<span className="toggle-button toggle-button--open"></span>);
  }
  return (<span className="toggle-button toggle-button--closed" onClick={(evt) => { openHandler(month, evt) }}></span>);
};

const MonthDrawer = ({
  month,
  isOpen,
  openHandler,
  onAddHabit,
  onDescChanged,
}) => (
  <div className={getClassName (isOpen)}>
    <header className="month-drawer__header">
      {getToggleIcon (isOpen, openHandler, month)}{month.label}
    </header>
    <main className="month-drawer__content">
      <MonthHabits month={month} onAddHabit={onAddHabit} onDescChanged={onDescChanged}/>
    </main>
  </div>
);

MonthDrawer.propTypes = {
  month: PropTypes.object,
  isOpen: PropTypes.bool,
  openHandler: PropTypes.func,
  onAddHabit: PropTypes.func,
  onDescChanged: PropTypes.func,
};

MonthDrawer.defaultProps = {
  month: {label: 'Junetober 3561'},
  isOpen: false,
  openHandler: () => {},
  onAddHabit: () => {},
  onDescChanged: () => {},
};

export default MonthDrawer;
