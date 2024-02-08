import { type TreeNodeInfo, Tree } from '@blueprintjs/core';
// @ts-expect-error
import cloneDeep from 'lodash/cloneDeep';
import * as React from 'react';

type NodePath = number[];

type TreeAction =
  | { type: 'SET_NODES' }
  | {
      type: 'SET_IS_EXPANDED';
      payload: { path: NodePath; isExpanded: boolean };
    }
  | { type: 'DESELECT_ALL' }
  | {
      type: 'SET_IS_SELECTED';
      payload: { path: NodePath; isSelected: boolean };
    };

function forEachNode(
  nodes: TreeNodeInfo[] | undefined,
  callback: (node: TreeNodeInfo) => void,
) {
  if (nodes === undefined) {
    return;
  }

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(
  nodes: TreeNodeInfo[],
  path: NodePath,
  callback: (node: TreeNodeInfo) => void,
) {
  callback(Tree.nodeFromPath(path, nodes));
}

function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case 'SET_NODES':
      // @ts-expect-error
      return cloneDeep(action.payload.newState);
    case 'DESELECT_ALL':
      const newState1 = cloneDeep(state);
      forEachNode(newState1, (node) => (node.isSelected = false));
      return newState1;
    case 'SET_IS_EXPANDED':
      const newState2 = cloneDeep(state);
      forNodeAtPath(
        newState2,
        action.payload.path,
        (node) => (node.isExpanded = action.payload.isExpanded),
      );
      return newState2;
    case 'SET_IS_SELECTED':
      const newState3 = cloneDeep(state);
      forNodeAtPath(
        newState3,
        action.payload.path,
        (node) => (node.isSelected = action.payload.isSelected),
      );
      return newState3;
    default:
      return state;
  }
}

export const TreeView = ({ initial_state }: { initial_state: any }) => {
  const [nodes, dispatch] = React.useReducer(treeExampleReducer, initial_state);

  const handleNodeClick = React.useCallback(
    (
      node: TreeNodeInfo,
      nodePath: NodePath,
      e: React.MouseEvent<HTMLElement>,
    ) => {
      // const originallySelected = node.isSelected;
      // if (!e.shiftKey) {
      //   dispatch({ type: 'DESELECT_ALL' });
      // }
      // dispatch({
      //   payload: {
      //     path: nodePath,
      //     isSelected: originallySelected == null ? true : !originallySelected,
      //   },
      //   type: 'SET_IS_SELECTED',
      // });
    },
    [],
  );

  const handleNodeCollapse = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: false },
        type: 'SET_IS_EXPANDED',
      });
    },
    [],
  );

  const handleNodeExpand = React.useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: true },
        type: 'SET_IS_EXPANDED',
      });
    },
    [],
  );
  React.useEffect(() => {
    dispatch({
      // @ts-expect-error
      payload: { newState: initial_state },
      type: 'SET_NODES',
    });
  }, [initial_state]);

  return (
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className='shadow-2'
    />
  );
};

/* tslint:enable:object-literal-sort-keys */
