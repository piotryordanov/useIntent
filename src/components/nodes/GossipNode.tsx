import React, { useContext, useEffect } from 'react';
import { TbLogicXnor } from 'react-icons/tb';
import icons from '@/lib/icons';

import { useEdges } from 'reactflow';

import { BuildContext } from '@/data/context';
import BaseNode from '@/components/flow/BaseNode';

function GossipNode({ id }: any) {
  // @ts-expect-error
  const { context, setContext } = useContext(BuildContext);
  const [tree, setTree] = React.useState(null);

  const edges = useEdges();
  console.log(edges);

  let isConnected = false;
  edges.map((edge) => {
    if (edge.target == id) {
      isConnected = true;
    }
  });
  console.log(isConnected);

  return (
    <BaseNode
      centerTitle={false}
      title='Gossip Time'
      handles={[
        { type: 'target', position: 'left' },
        // { type: 'source', position: 'right' },
      ]}
      editable={false}
      leftIcon={<icons.gossip />}
      nodeId={id}
    >
      {!isConnected && <div className=''>Please connect the node</div>}
      {isConnected && (
        <div className=''>
          <div className=''>Node Connected</div>
        </div>
      )}
    </BaseNode>
  );
}

export default GossipNode;
