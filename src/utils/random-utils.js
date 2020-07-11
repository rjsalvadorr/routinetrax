import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import foodIcons from '../data/food-icons';

const HABIT_PROMPTS = [
  'Look at spicy memes',
  'Acquire snacks',
  'Look for snacks',
  'Avoid your sweaty neighbour',
  'Fly a monkey',
  'Misplace my mind',
  'Slap a bear',
  'Drink a burger',
  'Become a harmonious banana',
  'Separate squirrels from squid',
  'Shout with happiness',
  'Make it funky',
  'Scream inside your heart',
  'Take it easy',
];

const getNewHabit = () => {
  return {
    icon: `/icons/food/${_.sample (foodIcons)}`,
    description: '',
    id: uuidv4 (),
  };
};

const getRandomHabits = numHabits => {
  const habs = [];
  const shuffledHabs = _.shuffle (HABIT_PROMPTS);
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

export {getNewHabit, getRandomHabits};
