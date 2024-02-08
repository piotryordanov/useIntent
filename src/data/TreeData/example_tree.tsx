import { TreeNode } from './useTree';

const example_tree: TreeNode[] = [
  {
    children: [
      {
        children: [
          {
            condition: ['card_balance', 'less_than', '300'],
            type: 'condition',
            children: [],
          },
          {
            condition: ['amm_balance', 'greater_than', '3000'],
            type: 'condition',
            children: [],
          },
          {
            condition: [],
            type: 'new',
            children: [],
          },
        ],
        condition: 'AND',
        type: 'block',
      },
      {
        children: [
          {
            condition: ['card_balance', 'less_than', '500'],
            type: 'condition',
            children: [],
          },
          {
            condition: ['amm_balance', 'greater_than', '5000'],
            type: 'condition',
            children: [],
          },
          {
            condition: [],
            type: 'new',
            children: [],
          },
        ],
        condition: 'AND',
        type: 'block',
      },
    ],
    condition: 'OR',
    type: 'block',
  },
];

export default example_tree;
