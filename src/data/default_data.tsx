// @ts-expect-error
import * as R from 'ramda';

const default_data = [
  {
    name: 'Card Balance',
    key: 'card_balance',
  },
  {
    name: 'AMM Balance',
    key: 'amm_balance',
  },
  {
    name: 'Berlin Weather',
    key: 'berlin_weather',
  },
];

export default R.map((item: any) => {
  item.full_name = item.name;
  return item;
}, default_data);
