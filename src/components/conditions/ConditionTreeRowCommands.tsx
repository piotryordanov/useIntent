import { Button, Tooltip } from '@blueprintjs/core';

import icons from '@/lib/icons';

const AddButton = ({
  tooltipText,
  ButtonIcon,
  buttonText,
  onClick,
}: {
  tooltipText: string;
  ButtonIcon: any;
  buttonText: string;
  onClick?: any;
}) => {
  return (
    <Button
      className='shadow-2 mr-auto text-zinc-500 '
      small
      minimal
      icon={
        <div className='flex flex-row space-x-1'>
          <icons.add />
          <div className='border-l-2 border-zinc-700'></div>
          <ButtonIcon />
        </div>
      }
      text={buttonText}
      onClick={onClick}
    />
  );
};

const Commands = ({ rowType, onClick }: { rowType: string; onClick: any }) => {
  return (
    <div
      className={`flex flex-row border-zinc-700 py-1.5 pl-2 ${
        rowType == 'row' ? 'border-l-1' : ''
      }`}
    >
      {rowType == 'row' && (
        <div className='mr-2'>
          <AddButton
            tooltipText='Add Condition'
            ButtonIcon={icons.condition}
            buttonText=''
            onClick={() => onClick('condition')}
          />
        </div>
      )}
      {rowType == 'header' && (
        <>
          <div className='mr-2 '>
            <AddButton
              tooltipText='Add Condition'
              ButtonIcon={icons.logicalAND}
              buttonText='AND'
              onClick={() => onClick('AND')}
            />
          </div>
          <div className='mr-2 w-8'>
            <AddButton
              tooltipText='Add Condition'
              ButtonIcon={icons.logicalOR}
              buttonText='OR'
              onClick={() => onClick('OR')}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Commands;
