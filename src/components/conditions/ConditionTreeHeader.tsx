import { Button } from '@blueprintjs/core';

import icons from '@/lib/icons';

import { ConditionTreeNodeItem } from '@/types/Condition';

type propTypes = {
  item: ConditionTreeNodeItem;
  conditionId: string;
  flowNodeId: string;
  onDelete: () => void;
};

const ConditionTreeHeader = (props: propTypes) => {
  const { item, onDelete } = props;
  const Icon = item.condition === 'AND' ? icons.logicalAND : icons.logicalOR;

  return (
    <div className='border-l-0 border-zinc-700 text-gray-400'>
      <div className='flex flex-row justify-between'>
        <div className='mt-1.5 flex flex-row'>
          <div className='bp5-icon mt-1 h-5 w-5'>
            <Icon />
          </div>
          <div className=''>{item.condition}</div>
        </div>
        <div className='p-1'>
          {item.id != '0' && (
            <Button
              minimal
              className='shadow-2 p-1'
              icon={<icons.delete className='text-zinc-400 ' />}
              onClick={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ConditionTreeHeader;
