import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import foodIcons from "../data/icons/food-icons"

// const HABIT_PROMPTS_SHORT = [
//   'Look at spicy memes',
//   'Acquire snacks',
//   'Look for snacks',
//   'Avoid your sweaty neighbour',
//   'Fly a monkey',
//   'Misplace my mind',
//   'Slap a bear',
//   'Drink a burger',
//   'Become a harmonious banana',
//   'Separate squirrels from squid',
//   'Shout with happiness',
//   'Make it funky',
//   'Scream inside your heart',
//   'Take it easy',
// ];

const HABIT_PROMPTS_LONG = [
  "Look for spicy yet wholesome memes",
  "Fly a monkey into the stratosphere",
  "Slap a bear, then run for your life",
  "Drink a burger after slurping down fries",
  "Become a wise and harmonious banana",
  "Separate rowdy squirrels from squid",
  "Make it funky with an erudite donkey",
  "Learn more about wild exotic animals",
  "Work on impossibly dangerous projects",
  "Shout with happiness into the void",
  "Misplace my mind in a maze of maize",
]

const getNewHabit = () => {
  return {
    icon: `/icons/food/${_.sample(foodIcons)}`,
    description: "",
    id: uuidv4(),
  }
}

const getRandomHabits = numHabits => {
  const habs = []
  const shuffledHabs = _.shuffle(HABIT_PROMPTS_LONG)
  const shuffledIcons = _.shuffle(foodIcons)
  for (let i = 0; i < numHabits; i++) {
    habs.push({
      icon: `/icons/food/${shuffledIcons[i]}`,
      description: shuffledHabs[i],
      id: uuidv4(),
    })
  }
  return habs
}

export { getNewHabit, getRandomHabits }
