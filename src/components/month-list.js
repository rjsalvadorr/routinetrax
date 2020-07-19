import PropTypes from 'prop-types';
import React from 'react';
import RoutineList from './routine-list';

import './month-list.css';

const MonthList = ({
  month,
  iconMode,
  actions,
}) => (
  <div className='month-list'>
    <header className="month-list__header">
      <span>{month.label}</span>
    </header>
    <main className="month-list__content">
      <RoutineList month={month} iconMode={iconMode} onAddHabit={actions.onAddHabit} onDescChanged={actions.onDescChanged}/>
    </main>
  </div>
);

MonthList.propTypes = {
  month: PropTypes.object,
  actions: PropTypes.object,
};

MonthList.defaultProps = {
  month: {label: 'Junetober 3561'},
  actions: {},
};

export default MonthList;
