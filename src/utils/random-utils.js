import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import foodIcons from '../data/icons/food-icons';
import {HABIT_PROMPTS_LONG, DEFAULT_NEW_HABITS} from '../data/settings';

const getNewRoutine = () => {
  return {
    icon: `/icons/food/${_.sample (foodIcons)}`,
    description: _.sample(DEFAULT_NEW_HABITS),
    id: uuidv4 (),
  };
};

const getInitialRoutines = numHabits => {
  const habs = [];
  const shuffledHabs = _.shuffle (HABIT_PROMPTS_LONG);
  const shuffledIcons = _.shuffle (foodIcons);
  for (let i = 0; i < numHabits; i++) {
    habs.push ({
      icon: `/icons/food/${shuffledIcons[i]}`,
      description: shuffledHabs[i],
      id: uuidv4 (),
    });
  }
  return habs;
};

export {getNewRoutine, getInitialRoutines};
