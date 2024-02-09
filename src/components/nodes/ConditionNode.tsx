import React, { useContext, useEffect } from 'react';
import { TbLogicXnor } from 'react-icons/tb';

import { BuildContext } from '@/data/context';
import useTree from '@/data/TreeData/useTree';

import createConditionsTree from '@/components/conditions/createConditionsTree';
import { TreeView } from '@/components/conditions/TreeView';
import BaseNode from '@/components/flow/BaseNode';

function ConditionNode({ id }: any) {
  // @ts-expect-error
  const { context, setContext } = useContext(BuildContext);
  const [tree, setTree] = React.useState(null);

  useEffect(() => {
    const updateTree = (newTree: any) => {
      setContext((prev: any) => {
        prev.strategies[prev.selectedStrategy].conditions[id] = newTree;
        return { ...prev };
      });
    };
    const conditionTree =
      context.strategies[context.selectedStrategy].conditions[id];

    if (conditionTree) {
      const newTree = createConditionsTree(
        conditionTree,
        id,
        updateTree,
        useTree
      );
      setTree(newTree);
    }
  }, [context, id, setContext]);

  if (tree === null) {
    return null;
  }
  return (
    <BaseNode
      centerTitle={false}
      title='Condition Name'
      handles={[
        // { type: 'target', position: 'left' },
        { type: 'source', position: 'right' },
      ]}
      editable={true}
      leftIcon={<TbLogicXnor />}
      nodeId={id}
    >
      <TreeView initial_state={tree} />
      <div className='mt-4 w-80'>
        This node, would allow creating complex conditional statement. The
        initial example is an "OR" example, where it's either the first
        condition, or the second condition that is enough to trigger an intent
      </div>
    </BaseNode>
  );
}

export default ConditionNode;
