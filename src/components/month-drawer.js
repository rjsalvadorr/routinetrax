import PropTypes from 'prop-types';
import React from 'react';

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

const MonthDrawer = ({month, isOpen, openHandler}) => (
  <div className={getClassName (isOpen)}>
    <header className="month-drawer__header">
      {getToggleIcon (isOpen, openHandler, month)}{month.label}
    </header>
    <main className="month-drawer__content">
      <p>
        Placeholder for month controls<br />
        Placeholder for month controls<br />
        Placeholder for month controls<br />
      </p>
    </main>
  </div>
);

MonthDrawer.propTypes = {
  month: PropTypes.object,
  openMonth: PropTypes.object,
};

MonthDrawer.defaultProps = {
  month: {label: 'Junetober 3561'},
  openMonth: {},
};

export default MonthDrawer;
