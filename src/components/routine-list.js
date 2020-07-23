import PropTypes from 'prop-types';
import React from 'react';
import Routine from '../components/routine';

import './routine-list.css';

const MAX_HABITS = 9;

const buildRoutines = (month, iconMode, actions) => {
  const habits = [];
  for (let i = 0; i < month.habits.length; i++) {
    const currentHabit = month.habits[i];
    habits.push (
      <Routine
        habit={currentHabit}
        number={i + 1}
        iconMode={iconMode}
        actions={actions}
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

const removeButton = (month, onRemoveHabit) => {
  if (month.habits.length > 1) {
    return (
      <button
        className="rt-button rt-button--remove"
        onClick={onRemoveHabit}
        data-table-id={month.id}
      >
        Remove
      </button>
    );
  }
  return null;
};

const copyLastButton = (month, onCopyLast) => {
  if (!(month.tags && month.tags.includes('first'))) {
    return (
      <button
        className="rt-button rt-button--copy"
        onClick={onCopyLast}
        data-table-id={month.id}
      >
        Copy Last
      </button>
    );
  }
  return null;
};

const RoutineList = ({month, iconMode, actions}) => (
  <div className="routine-list">
    {buildRoutines (month, iconMode, actions)}
    <div className="routine-list__btn-group">
      {addButton (month, actions.onAddHabit)}

      {removeButton (month, actions.onRemoveHabit)}

      <button
        className="rt-button rt-button--clear"
        onClick={actions.onClearHabits}
        data-table-id={month.id}
      >
        Clear
      </button>

      {copyLastButton (month, () => {})}
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
