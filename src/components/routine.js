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

const Routine = ({habit, number, iconMode, onDescChanged}) => (
  <div className="routine">
    {getHabitKey(habit, number, iconMode)}
    <input
      type="text"
      className="routine__desc"
      name="routine__desc"
      defaultValue={habit.description}
      onChange={onDescChanged}
      required
      maxLength="30"
      data-habit-id={habit.id}
    />
  </div>
);

Routine.propTypes = {
  month: PropTypes.object,
  onDescChanged: PropTypes.func,
};

Routine.defaultProps = {
  month: {},
  onDescChanged: () => {},
};

export default Routine;
