import { Button, Intent } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core';
// @ts-expect-error
import * as R from 'ramda';
import React, { useContext } from 'react';

import icons from '@/lib/icons';

import { BuildContext } from '@/data/context';
import default_data from '@/data/default_data';

import condition_operators from '@/components/conditions/conditionOperators';
import conditionOperators from '@/components/conditions/conditionOperators';
import Select from '@/components/Select';

import { Context } from '@/types/Context';

const getOperatorElement = (
  conditions: string[],
  index: number,
  default_data: any,
  onChange: any
) => {
  const condition = conditions[index];
  if (Number.isInteger(Number(condition))) {
    return (
      <InputGroup
        placeholder='Placeholder text'
        disabled={false}
        small={true}
        value={condition}
        type='number'
        readOnly={false}
        onChange={(e: any) => onChange(conditions, index, e.value)}
        className='w-20 !p-0'
      />
    );
  } else {
    let intent, title;
    if (condition_operators.find((item: any) => item.key === condition)) {
      const v = condition_operators.find((item: any) => item.key === condition);
      title = v.name;
      intent = Intent.SUCCESS;
    } else {
      const current = default_data.find((item: any) => item.key === condition);
      title = R.defaultTo('---', current?.name);
      intent = Intent.PRIMARY;
    }
    return (
      <Select
        default_data={default_data}
        selectedValue={0}
        onItemSelect={(e: any) => onChange(conditions, index, e.key)}
      >
        <Button
          text={title}
          intent={intent}
          rightIcon='double-caret-vertical'
          small={true}
        />
      </Select>
    );
  }
};

type ConditionTreeProps = {
  condition: any;
  onDelete: () => void;
  onChange: (conditions: string[], index: number, value: string) => void;
};

function addFullNameToIndicators(context: Context) {
  return Object.keys(
    context.strategies[context.selectedStrategy].indicators
  ).map((key) => {
    const indicator =
      context.strategies[context.selectedStrategy].indicators[key];
    indicator.full_name = indicator.name;
    indicator.key = key;
    return indicator;
  });
}

const ConditionTreeRow = (props: ConditionTreeProps) => {
  const { condition, onDelete, onChange } = props;
  // @ts-expect-error
  const { context } = useContext(BuildContext);
  const indicators = addFullNameToIndicators(context);

  const availableData = indicators.concat(default_data);

  return (
    <div className=''>
      <div className='border-b-1 border-l-1 w-full border-zinc-700 pl-2'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row space-x-4 py-2 pr-4'>
            <div className=''>
              {getOperatorElement(condition, 0, availableData, onChange)}
            </div>
            <div className=''>
              {getOperatorElement(condition, 1, conditionOperators, onChange)}
            </div>
            <div className=''>
              {getOperatorElement(condition, 2, availableData, onChange)}
            </div>
          </div>
          <div className='p-1'>
            <Button
              minimal
              className='shadow-2 p-1'
              icon={<icons.delete className='text-zinc-400 ' />}
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConditionTreeRow;
