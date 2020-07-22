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
const DEFAULT_INCL_CURRENT_MTH = false;

export {
  PAPER_OPTIONS,
  MONTH_OPTIONS,
  DEFAULT_MONTHS,
  MAX_MONTHS,
  NUM_DEFAULT_HABITS,
  DEFAULT_ICON_MODE,
  DEFAULT_INCL_CURRENT_MTH,
}
