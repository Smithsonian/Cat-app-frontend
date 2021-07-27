import moment from 'moment';

export const initialForm = {
  project_id: '',
  deployment_id: '',
  sequence_id: '',
  pattern: 'Unknown',
  bicolor: 'Unknown',
  longHair: 'Unknown',
  sex: 'Unknown',
  notched: 'Unknown',
  collar: 'Unknown',
  minLon: -76.88644409179689,
  maxLon: -77.14256286621095,
  minLat: 38.849333913235476,
  maxLat: 38.95406929344106,
  date_time_original: {
    gte: moment().subtract(1, 'year').format('yyyy-MM-DD'),
    lt: moment().format('yyyy-MM-DD')
  }
};

export const patternList = [
  'Black/Gray',
  'Tabby/Spotted',
  'Orange/White',
  'Tortoiseshell/Calico',
  'Siamese',
  'Unknown'
];

export const sexList = ['Male', 'Female', 'Unknown'];

export const genericList = ['Yes', 'No', 'Unknown'];
