import PropTypes from 'prop-types';
import React from 'react';

import './routine.css';

const getHabitKey = (habit, number, isIconMode) => {
  if(isIconMode) {
    return (<img className="routine__key routine__img" src={habit.icon} alt="habit-icon" />);
  } else {
    return (<span className="routine__key routine__number">{number}</span>);
  }
}

const Routine = ({habit, number, iconMode, actions}) => {
  return (
    <div className="routine">
      {getHabitKey(habit, number, iconMode)}
      <input
        type="text"
        className="routine__desc"
        name="routine__desc"
        defaultValue={habit.description}
        onChange={actions.onDescChanged}
        required
        maxLength="40"
        data-habit-id={habit.id}
      />
    </div>
  );
}

Routine.propTypes = {
  habit: PropTypes.object,
  number: PropTypes.number,
  iconMode: PropTypes.bool,
  actions: PropTypes.object,
};

Routine.defaultProps = {
  habit: {},
  number: 99,
  iconMode: false,
  actions: {},
};

export default Routine;
