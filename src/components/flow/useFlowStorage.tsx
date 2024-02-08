import { useReactFlow } from "reactflow";

const useFlowStorage = () => {
  const { setViewport } = useReactFlow();

  const restoreFlow = (defaultFlow: any, setNodes: any, setEdges: any) => {
    let flow;

    if (defaultFlow) {
      flow = defaultFlow;

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport(flow.viewport || { x: 0, y: 0 });
    }
  };

  return { restoreFlow };
};

export default useFlowStorage;
