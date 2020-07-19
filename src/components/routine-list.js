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
        className="rt-button rt-button--add"
        onClick={onAddHabit}
        data-table-id={month.id}
      >
        Add
      </button>
    );
  }
  return null;
};

const RoutineList = ({month, iconMode, actions}) => (
  <div className="routine-list">
    {buildHabits (month, iconMode, actions.onDescChanged)}
    <div className="routine-list__btn-group">
      {addButton (month, actions.onAddHabit)}
      <button
        className="rt-button rt-button--remove"
        onClick={actions.onRemoveHabit}
        data-table-id={month.id}
      >
        Remove
      </button>

      <button
        className="rt-button rt-button--clear"
        onClick={() => {}}
        data-table-id={month.id}
      >
        Clear
      </button>

      <button
        className="rt-button rt-button--copy"
        onClick={() => {}}
        data-table-id={month.id}
      >
        Copy
      </button>
    </div>
  </div>
);

RoutineList.propTypes = {
  month: PropTypes.object,
  actions: PropTypes.object,
};

RoutineList.defaultProps = {
  month: {},
  actions: {},
};

export default RoutineList;
