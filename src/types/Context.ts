import { TreeNode } from '@/data/TreeData/useTree';

import { Indicator } from './indicator';

type Settings = {
  asset: string;
  timeframe: string;
};

export type Strategy = {
  name: string;
  data: { [key: string]: object };
  indicators: { [key: string]: Indicator };
  conditions: { [key: string]: TreeNode[] };
  signals: { [key: string]: object };
  settings: Settings;
  flow: any;
};

export type Context = {
  strategies: Strategy[];
  selectedStrategy: number;
  nodeStates: object;
};

export interface BuildContextType {
  context: Context;
  setContext: (context: Context) => void;
}
