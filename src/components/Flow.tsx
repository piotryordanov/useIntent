import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { addEdge, Background, Controls, MiniMap, Node, NodeTypes, ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";

import "reactflow/dist/style.css";

import useDragDropEvent from "@/components/flow/useDragDropEvent";
import useFlowStorage from "@/components/flow/useFlowStorage";

type FlowProps = {
  nodeTypes: NodeTypes;
  onDeleteNodes: (flow: object, nodes: Node[]) => void;
  defaultFlow: any;
  useProximity: boolean;
  useSelfStorage: boolean;
  saveFlow: any;
  FlowPanel: () => JSX.Element;
  onInit?: (rfInstance: any) => void;
  onDragStart?: (node: Node, setNodes: any) => void;
  onDragEnd?: (node: Node) => void;
  onNodeDrag?: (nodes: Node[], node: Node, setNodes: any) => void;
  onNodeMouseEnter?: (node: Node) => void;
  onNodeMouseLeave?: (node: Node) => void;
};

function Flow(props: FlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const nodeTypes = useMemo(() => props.nodeTypes, []);

  const useDragDrop = useDragDropEvent(rfInstance, setNodes);
  const storage = useFlowStorage();

  useEffect(() => {
    if (props.useSelfStorage && nodes.length == 0) {
      storage.restoreFlow(props.defaultFlow, setNodes, setEdges);
    }
  }, [nodes, setNodes, setEdges, props.defaultFlow, storage]);

  useEffect(() => {
    storage.restoreFlow(props.defaultFlow, setNodes, setEdges);
  }, [props.defaultFlow]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onInit={(newRef) => {
        setRfInstance(newRef);
        if (props.onInit) {
          props.onInit(newRef);
        }
      }}
      onNodesDelete={(nodes: Node[]) => {
        if (props.onDeleteNodes) {
          props.onDeleteNodes(rfInstance.toObject(), nodes);
        }
      }}
      onNodesChange={(changes) => {
        if (rfInstance != null) {
          props.saveFlow(rfInstance.toObject());
        }
        onNodesChange(changes);
      }}
      onEdgesChange={(changes) => {
        props.saveFlow(rfInstance.toObject());
        onEdgesChange(changes);
      }}
      onConnect={useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges])}
      proOptions={{ hideAttribution: true }}
      onMoveEnd={() => {
        props.saveFlow(rfInstance.toObject());
      }}
      onDrop={useDragDrop.onDrop}
      onDragOver={useDragDrop.onDragOver}
      onNodeDragStart={(evt, node) => {
        if (props.onDragStart) {
          props.onDragStart(node, setNodes);
        }
      }}
      onNodeDrag={(evt, node) => {
        if (props.onNodeDrag) {
          props.onNodeDrag(nodes, node, setNodes);
        }
      }}
      onNodeDragStop={(ev, node) => {
        if (props.useProximity) {
          // proximityConnect.onNodeDragStop();
        }

        if (node.type == "tabNode" && props.onDragEnd) {
          props.onDragEnd(node);
        }
      }}
      onNodeMouseLeave={(evt, node) => {
        if (props.onNodeMouseLeave) {
          props.onNodeMouseLeave(node);
        }
      }}
      onNodeMouseEnter={(evt, node) => {
        if (props.onNodeMouseEnter) {
          props.onNodeMouseEnter(node);
        }
      }}
      // fitViewOptions={{ padding: 1, minZoom: 1 }}
      fitView={false}
      // defaultViewport={props.defaultFlow.viewport}
      minZoom={0.1}
      maxZoom={1.3}
      // snapToGrid={true}
      // snapGrid={[30, 30]}
    >
      {props.FlowPanel && <props.FlowPanel />}
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default function ReactFlowWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
