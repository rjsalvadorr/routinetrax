import PropTypes from 'prop-types';
import React from 'react';

import './month-habit.css';

const MonthHabit = ({habit, onDescChanged}) => (
  <div className="month-habit">
    <img className="month-habit__img" src={habit.icon} alt="habit-icon" />
    <input type="text" className="month-habit__desc" name="month-habit__desc" defaultValue={habit.description} onChange={onDescChanged} required maxLength="30" data-habit-id={habit.id} />
  </div>
);

MonthHabit.propTypes = {
  month: PropTypes.object,
  onDescChanged: PropTypes.func,
};

MonthHabit.defaultProps = {
  month: {},
  onDescChanged: () => {},
};

export default MonthHabit;
