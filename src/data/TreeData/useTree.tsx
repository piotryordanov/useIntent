// @ts-expect-error
import * as R from 'ramda';

export type TreeNode = {
  id?: number;
  children: TreeNode[];
  condition: 'AND' | 'OR' | string[];
  type: 'block' | 'condition' | 'new';
};

const defaultData: TreeNode[] = [
  {
    children: [],
    condition: 'AND',
    type: 'block',
  },
];

const useTree = (initial_data: TreeNode[] = defaultData) => {
  let tree: TreeNode[] = [];

  function setTreeData(initial_data: TreeNode[]) {
    const addIdToNode = ({
      node,
      lastId,
    }: {
      node: TreeNode;
      lastId: number;
    }) => {
      node.id = lastId;
      lastId++;
      if (node.children) {
        node.children.forEach((child) => {
          lastId = addIdToNode({ node: child, lastId: lastId }).lastId;
        });
      }
      return { node: node, lastId: lastId };
    };
    const { node, lastId } = addIdToNode({ node: initial_data[0], lastId: 0 });
    tree = [node];
  }

  setTreeData(initial_data);

  const updateNode = (id: number, newCondition: string[]) => {
    const _updateNode = (node: TreeNode) => {
      if (node.id === id) {
        node.condition = newCondition;
      } else if (node.children.length > 0) {
        node.children.forEach((child) => {
          _updateNode(child);
        });
      }
      return tree;
    };
    tree.map((node) => {
      _updateNode(node);
    });

    setTreeData(tree);
    return tree;
  };

  const deleteNode = (id: number) => {
    const removeNodeById = (
      nodes: TreeNode[],
      idToRemove: number
    ): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        if (node.id === idToRemove) {
          return acc;
        }
        if (node.children) {
          node = {
            ...node,
            children: removeNodeById(node.children, idToRemove),
          };
        }

        acc.push(node);
        return acc;
      }, []);
    };
    tree = removeNodeById(tree, id);
    setTreeData(tree);
    return tree;
  };

  const addNode = (
    parentId: number,
    newData: TreeNode,
    shouldBeLast = false
  ) => {
    const _addNode = (node: TreeNode) => {
      if (node.id === parentId) {
        node.children = R.insert(
          shouldBeLast ? node.children.length : node.children.length - 1,
          newData,
          node.children
        );
      } else if (node.children.length > 0) {
        node.children.forEach((child) => {
          _addNode(child);
        });
      }
      return tree;
    };
    tree.map((node) => {
      _addNode(node);
    });
    setTreeData(tree);
    return tree;
  };

  return { tree, addNode, updateNode, deleteNode };
};

export default useTree;
