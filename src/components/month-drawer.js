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

const getToggleIcon = (isOpen, onOpen, month) => {
  if (isOpen) {
    return (<span className="toggle-button toggle-button--open"></span>);
  }
  return (<span className="toggle-button toggle-button--closed" onClick={(evt) => { onOpen(month, evt) }}></span>);
};

const MonthDrawer = ({
  month,
  isOpen,
  actions,
}) => (
  <div className={getClassName (isOpen)}>
    <header className="month-drawer__header">
      {getToggleIcon (isOpen, actions.onOpen, month)}{month.label}
    </header>
    <main className="month-drawer__content">
      <MonthHabits month={month} onAddHabit={actions.onAddHabit} onDescChanged={actions.onDescChanged}/>
    </main>
  </div>
);

MonthDrawer.propTypes = {
  month: PropTypes.object,
  isOpen: PropTypes.bool,
  actions: PropTypes.object,
};

MonthDrawer.defaultProps = {
  month: {label: 'Junetober 3561'},
  isOpen: false,
  actions: {},
};

export default MonthDrawer;
