// @ts-expect-error
import * as R from 'ramda';

import ConditionTreeHeader from '@/components/conditions/ConditionTreeHeader';
import ConditionTreeRow from '@/components/conditions/ConditionTreeRow';
import ConditionTreeRowCommands from '@/components/conditions/ConditionTreeRowCommands';

import { ConditionTreeNode, ConditionTreeNodeItem } from '@/types/Condition';

const createConditionsTree = (
  tree: any,
  flowNodeId: string,
  updateTree: any,
  treeMethods: any,
): any => {
  const { addNode, deleteNode, updateNode } = treeMethods(tree);
  const createNode = (
    item: ConditionTreeNodeItem,
    parentId: string,
  ): ConditionTreeNode[] => {
    if (item.type == 'block') {
      const children = item.children.map((child: any) => {
        return createNode(child, item.id);
      });

      return [
        {
          isExpanded: true,
          disabled: false,
          hasCaret: true,
          childNodes: R.flatten(children),
          label: (
            <ConditionTreeHeader
              item={item}
              conditionId={item.id}
              flowNodeId={flowNodeId}
              onDelete={() => {
                updateTree(deleteNode(item.id));
              }}
            />
          ),
        },
      ];
    } else if (item.type == 'new') {
      return [
        {
          disabled: false,
          label: (
            <ConditionTreeRowCommands
              onClick={() => {
                const newTree = addNode(parentId, {
                  children: [],
                  condition: ['---', 'cross_over', '---'],
                  type: 'condition',
                });

                updateTree(newTree);
              }}
              rowType='row'
            />
          ),
        },
      ];
    } else {
      return [
        {
          disabled: false,
          label: (
            <ConditionTreeRow
              condition={item.condition}
              onChange={(
                conditions: string[],
                index: number,
                value: string,
              ) => {
                conditions[index] = value;
                updateTree(updateNode(item.id, conditions));
              }}
              onDelete={() => {
                updateTree(deleteNode(item.id));
              }}
            />
          ),
        },
      ];
    }
  };
  const initial_state = tree.map((item: ConditionTreeNodeItem) => {
    return createNode(item, item.id);
  });
  initial_state.push({
    disabled: false,
    label: (
      <div className='border-t-1 border-zinc-600'>
        <ConditionTreeRowCommands
          onClick={(condition: string) => {
            const newTree = addNode(
              0,
              {
                children: [
                  {
                    condition: [],
                    type: 'new',
                    children: [],
                  },
                ],
                condition: condition,
                type: 'block',
              },
              true,
            );

            updateTree(newTree);
          }}
          rowType='header'
        />
      </div>
    ),
  });
  return R.flatten(initial_state);
};

export default createConditionsTree;
