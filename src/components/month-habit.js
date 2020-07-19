import PropTypes from 'prop-types';
import React from 'react';

import './month-habit.css';

const getHabitKey = (habit, number, isIconMode) => {
  if(isIconMode) {
    return (<img className="month-habit__key month-habit__img" src={habit.icon} alt="habit-icon" />);
  } else {
    return (<span className="month-habit__key month-habit__number">{number}</span>);
  }
}

const MonthHabit = ({habit, number, iconMode, onDescChanged}) => (
  <div className="month-habit">
    {getHabitKey(habit, number, iconMode)}
    <input
      type="text"
      className="month-habit__desc"
      name="month-habit__desc"
      defaultValue={habit.description}
      onChange={onDescChanged}
      required
      maxLength="30"
      data-habit-id={habit.id}
    />
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
