import moment from 'moment';

export const initialForm = {
  project_id: '',
  deployment_id: '',
  sequence_id: '',
  status: 'Unknown',
  pattern: 'Unknown',
  primaryColor: 'Unknown',
  secondaryColor: 'Unknown',
  minLon: -76.97261,
  maxLon: -77.09106,
  minLat: 38.87531,
  maxLat: 38.91299,
  date_time_original: {
    gte: moment().subtract(1, 'year').format('yyyy-MM-DD'),
    lt: moment().format('yyyy-MM-DD')
  }
};

export const statusList = [
  'Unknown',
  'Colony/Community/Notched ear',
  'Euthanized',
  'House',
  'Shelter',
  'Stray/Wild'
];

export const patternList = [
  'Unknown',
  'Tabby/Tiger',
  'Tortoiseshell',
  'Black/Grey',
  'Orange/White',
  'Calico',
  'Solid',
  'Bicolor',
  'Points',
  'Spotted',
  'Siamese'
];

export const colorList = ['Unknown', 'Black', 'Brown', 'Buff/Tan', 'Gray', 'Orange', 'White'];

export const captureSideList = ['Left', 'Right', 'Bottom', 'Top', 'Front', 'Rear'];
