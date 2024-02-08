import { nanoid } from 'nanoid';
import { useCallback } from 'react';

import { useContext } from 'react';

import { BuildContext } from '@/data/context';
import { defaultNodeState } from '@/types/NodeState';

const useDragDropEvent = (rfInstance: any, setNodes: any) => {
  // @ts-expect-error
  const { setContext } = useContext(BuildContext);
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const data = JSON.parse(event.dataTransfer.getData('application/data'));
      //
      const strategyKey = event.dataTransfer.getData('application/strategyKey');
      const strategyValue = JSON.parse(
        event.dataTransfer.getData('application/strategyValue')
      );
      //
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: data,
      };
      setNodes((nds: any) => (nds = nds.concat(newNode)));

      setContext((prevContext: any) => {
        prevContext.nodeStates[newNode.id] = defaultNodeState;
        prevContext.strategies[prevContext.selectedStrategy][strategyKey][
          newNode.id
        ] = strategyValue;
        return { ...prevContext };
      });
    },
    [rfInstance, setNodes]
  );

  return { onDrop, onDragOver };
};
export default useDragDropEvent;
