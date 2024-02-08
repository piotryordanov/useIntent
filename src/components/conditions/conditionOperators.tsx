// @ts-expect-error
import * as R from 'ramda';

const conditionOperators = [
  { name: '>', key: 'greater_than', index: 0 },
  { name: '<', key: 'less_than', index: 1 },
];

export default R.map((item: any) => {
  item.full_name = item.name;
  return item;
}, conditionOperators);
