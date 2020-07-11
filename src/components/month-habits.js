import PropTypes from 'prop-types';
import React from 'react';
import MonthHabit from '../components/month-habit';

import './month-habits.css';

const MAX_HABITS = 9;

const buildHabits = (month, onDescChanged) => {
  return month.habits.map (habit => {
    return <MonthHabit habit={habit} key={habit.id} onDescChanged={onDescChanged}/>;
  });
};

const addButton = (month, onAddHabit) => {
  if (month.habits.length < MAX_HABITS) {
    return (
      <button
        className="rt-button rt-button--habit"
        onClick={onAddHabit}
        data-table-id={month.id}
      >
        Add habit
      </button>
    );
  }
  return null;
}

const MonthHabits = ({
  month,
  onDescChanged,
  onAddHabit,
}) => (
  <div className="month-habits">
    {buildHabits (month, onDescChanged)}
    {addButton(month, onAddHabit)}
  </div>
);

MonthHabits.propTypes = {
  month: PropTypes.object,
  onAddHabit: PropTypes.func,
  onDescChanged: PropTypes.func,
};

MonthHabits.defaultProps = {
  month: {},
  onAddHabit: () => {},
  onDescChanged: () => {},
};

export default MonthHabits;
