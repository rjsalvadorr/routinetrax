import PropTypes from 'prop-types';
import React from 'react';
import Routine from '../components/routine';

import './routine-list.css';

const MAX_HABITS = 9;

const buildHabits = (month, iconMode, onDescChanged) => {
  const habits = [];
  for (let i = 0; i < month.habits.length; i++) {
    const currentHabit = month.habits[i];
    habits.push (
      <Routine
        habit={currentHabit}
        number={i + 1}
        iconMode={iconMode}
        onDescChanged={onDescChanged}
        key={currentHabit.id}
      />
    );
  }
  return habits;
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
};

const RoutineList = ({month, iconMode, onDescChanged, onAddHabit}) => (
  <div className="routine-list">
    {buildHabits (month, iconMode, onDescChanged)}
    {addButton (month, onAddHabit)}
  </div>
);

RoutineList.propTypes = {
  month: PropTypes.object,
  onAddHabit: PropTypes.func,
  onDescChanged: PropTypes.func,
};

RoutineList.defaultProps = {
  month: {},
  onAddHabit: () => {},
  onDescChanged: () => {},
};

export default RoutineList;
