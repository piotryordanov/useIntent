import example_tree from '@/data/TreeData/example_tree';

import { Strategy } from '@/types/Context';

const strategies: Strategy[] = [
  {
    name: 'MA Cross',
    data: {
      data_1: {
        asset: 'BTC/USDT',
      },
    },
    indicators: {},
    conditions: {
      condition_1: example_tree,
      condition_2: [{ children: [], condition: 'OR', type: 'block' }],
    },
    signals: {
      signal_1: {
        type: 'long',
      },
    },
    settings: {
      asset: '',
      timeframe: '',
    },
    flow: {
      edges: [],
      nodes: [
        {
          width: 284,
          height: 149,
          id: 'data_1',
          type: 'dataNode',
          dragHandle: '.node-drag-handle',
          data: {
            title: 'Asset',
          },
          position: {
            x: 270,
            y: -195,
          },
          positionAbsolute: {
            x: 270,
            y: -195,
          },
          selected: true,
          dragging: true,
        },
      ],
      viewport: {
        x: '-192.24513404107506',
        y: '250.35760787455027',
        zoom: '1.098854217576879',
      },
    },
  },
];

export default strategies;
