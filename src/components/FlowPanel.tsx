import { Tooltip } from '@blueprintjs/core';
import { Panel } from 'reactflow';

import icons from '@/lib/icons';

import strategies from '@/data/sample_strategies';

const defaultClass = 'h-5 w-5';
const ActionButtons = [
  {
    tooltip: 'Add Condition',
    icon: <icons.condition className={defaultClass} />,
    color: 'text-gray-300',
    data: {},
    nodeType: 'conditionNode',
    strategyKey: 'conditions',
    strategyValue: strategies[0].conditions.condition_2,
  },
  {
    tooltip: 'Add Smart Condition',
    icon: <icons.smartNode className={defaultClass} />,
    color: 'text-gray-300',
    data: { direction: 'long' },
    nodeType: 'smartNode',
    strategyKey: 'signals',
    strategyValue: strategies[0].signals.signal_1,
  },
  {
    tooltip: 'Add Gossip Node',
    icon: <icons.gossip className={defaultClass} />,
    color: 'text-gray-300',
    data: {},
    nodeType: 'gossipNode',
    strategyKey: 'data',
    strategyValue: strategies[0].data.data_1,
  },
];

const FlowPanel = () => {
  const onDragStart = (event: any, item: any) => {
    const { nodeType, data, strategyKey, strategyValue } = item;
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/data', JSON.stringify(data));
    event.dataTransfer.setData(
      'application/strategyValue',
      JSON.stringify(strategyValue)
    );
    event.dataTransfer.setData('application/strategyKey', strategyKey);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Panel className='h-screen p-0' position='top-left'>
      <Tooltip content={'Drag the below icons into the board'}>
        <div className='text-center bg-slate-700 cursor-grab text-gray-400 w-9 rounded'>
          Drag <br />
          Me
        </div>
      </Tooltip>
      <div className=' flex flex-col'>
        {ActionButtons.map((item) => (
          <Tooltip key={item.tooltip} content={item.tooltip}>
            <div
              className={`shadow-2 my-2 cursor-grab rounded bg-slate-700 p-2 ${item.color}`}
              onDragStart={(event) => onDragStart(event, item)}
              draggable
            >
              {item.icon}
            </div>
          </Tooltip>
        ))}
      </div>
    </Panel>
  );
};

export default FlowPanel;
