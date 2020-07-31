const PAPER_OPTIONS = [
  {value: 'letter', label: 'Letter'},
  {value: 'a4', label: 'A4'},
];

const MONTH_OPTIONS = [
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
  {value: 7, label: '7'},
  {value: 8, label: '8'},
  {value: 9, label: '9'},
  {value: 10, label: '10'},
  {value: 11, label: '11'},
  {value: 12, label: '12'},
];
const DEFAULT_MONTHS = MONTH_OPTIONS[1];
const MAX_MONTHS = MONTH_OPTIONS[11].value;

const NUM_DEFAULT_HABITS = 5;
const DEFAULT_ICON_MODE = false;
const DEFAULT_INCL_CURRENT_MTH = true;

const COLORS = {
  darkGrey: '#3c4245',
  grey: '#6f7678',
  green: '#658375',
  pastel: '#dfcdc3',
};

const DEFAULT_NEW_HABITS = [
  'Do a thing',
  'Do the thing',
  'Do all the things',
  'Do this thing',
  'Do another thing',
  'Do one more thing',
  'Another thing to do',
  'One more thing',
  'Do another thing',
  'Do this thing too',
  'Do this next thing',
  "Don't forget to do this thing",
];

const HABIT_PROMPTS_SHORT = [
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
];

export {
  PAPER_OPTIONS,
  MONTH_OPTIONS,
  DEFAULT_MONTHS,
  MAX_MONTHS,
  NUM_DEFAULT_HABITS,
  DEFAULT_ICON_MODE,
  DEFAULT_INCL_CURRENT_MTH,
  COLORS,
  DEFAULT_NEW_HABITS,
  HABIT_PROMPTS_SHORT,
  HABIT_PROMPTS_LONG,
};
