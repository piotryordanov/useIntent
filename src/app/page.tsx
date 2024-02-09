'use client';
import React, { useState } from 'react';

import Flow from '@/components/Flow';
import FlowPanel from '@/components/FlowPanel';
import BuildProvider from '@/data/context';
import ConditionNode from '@/components/nodes/ConditionNode';
import GossipNode from '@/components/nodes/GossipNode';
import SmartNode from '@/components/nodes/SmartNode';

function Page() {
  const [rfInstance, setRfInstance] = useState<any>(null);

  const nodeTypes = {
    conditionNode: ConditionNode,
    gossipNode: GossipNode,
    smartNode: SmartNode,
  };
  const defaultFlow = {
    nodes: [
      {
        id: 'condition_1',
        type: 'conditionNode',
        dragHandle: '.node-drag-handle',
        data: { title: 'Asset' },
        position: { x: 150, y: 50 },
      },
      {
        id: 'gossip_1',
        type: 'gossipNode',
        dragHandle: '.node-drag-handle',
        data: { title: 'Asset' },
        position: { x: 700, y: 100 },
      },
      {
        id: 'condition_2',
        type: 'smartNode',
        dragHandle: '.node-drag-handle',
        data: { title: 'Asset' },
        position: { x: 650, y: 400 },
      },
      {
        id: 'gossip_2',
        type: 'gossipNode',
        dragHandle: '.node-drag-handle',
        data: { title: 'Asset' },
        position: { x: 1100, y: 300 },
      },
    ],
    edges: [{ id: 'ed-1', source: 'condition_1', target: 'gossip_1' }],
  };

  return (
    <div className='w-screen h-screen bg-[#202124]'>
      <Flow
        onInit={setRfInstance}
        defaultFlow={defaultFlow}
        useSelfStorage={false}
        nodeTypes={nodeTypes}
        saveFlow={() => console.log}
        FlowPanel={FlowPanel}
      />
    </div>
  );
}

function FlowWithProvider() {
  return (
    <BuildProvider>
      <Page />
    </BuildProvider>
  );
}

export default FlowWithProvider;
