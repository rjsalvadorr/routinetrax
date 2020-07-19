const PAPER_OPTIONS = [
  {value: 'letter', label: 'Letter'},
  {value: 'a4', label: 'A4'},
];

const MONTH_OPTIONS = [
  {value: 2, label: '2'},
  {value: 4, label: '4'},
  {value: 6, label: '6'},
  {value: 8, label: '8'},
  {value: 10, label: '10'},
  {value: 12, label: '12'},
];

const DEFAULT_MONTHS = MONTH_OPTIONS[1];
const MAX_MONTHS = MONTH_OPTIONS[5].value;

export {
  PAPER_OPTIONS,
  MONTH_OPTIONS,
  DEFAULT_MONTHS,
  MAX_MONTHS,
}
