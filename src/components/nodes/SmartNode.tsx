import React, { useContext, useEffect } from 'react';
import icons from '@/lib/icons';
import { Button, Intent } from '@blueprintjs/core';

import Select from '@/components/Select';
import BaseNode from '@/components/flow/BaseNode';

const smartConditions = [
  {
    full_name: 'Pay for delivery upon delivery conf',
    name: 'Pay for delivery upon delivery conf',
    key: 'delivery',
  },
  {
    full_name: "Auto-Deposit to PoolTogether's new pools",
    name: "Auto-Deposit to PoolTogether's new pools",
    key: 'pooltogether',
  },
  {
    full_name: 'Copy a trading strategy',
    name: 'Copy a trading strategy',
    key: 'trading',
  },
  {
    full_name: 'Provide liquidity to AMM',
    name: 'Provide liquidity to AMM',
    key: 'amm',
  },
];

function SmartNode({ id }: any) {
  const [selectedValue, setSelectedValue] = React.useState(0);
  console.log(selectedValue);
  return (
    <BaseNode
      centerTitle={false}
      title='Smart Node'
      handles={[
        // { type: 'target', position: 'left' },
        { type: 'source', position: 'right' },
      ]}
      editable={false}
      leftIcon={<icons.smartNode />}
      nodeId={id}
    >
      <div className='shadow p-4'>
        <Select
          default_data={smartConditions}
          selectedValue={selectedValue}
          onItemSelect={(e: any) => setSelectedValue(e.index)}
        >
          <Button
            text={smartConditions[selectedValue].full_name}
            intent={Intent.PRIMARY}
            rightIcon='double-caret-vertical'
            small={true}
          />
        </Select>
      </div>
      <div className='mt-4 w-80'>
        This node represents ready-made recipies (ala Zapier). They can do
        complex underlying actions (like trading) or simpler ones like buying
        pizza.
      </div>
    </BaseNode>
  );
}

export default SmartNode;
