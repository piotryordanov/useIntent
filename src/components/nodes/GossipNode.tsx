import React, { useContext, useEffect } from 'react';
import { Button, ProgressBar, Intent } from '@blueprintjs/core';
import icons from '@/lib/icons';

import { useEdges } from 'reactflow';

import { BuildContext } from '@/data/context';
import BaseNode from '@/components/flow/BaseNode';

const states = [
  {
    index: 0,
    text: 'Sharing intent to gossip network.',
  },
  {
    index: 1,
    text: 'Waiting for solvers.',
  },
  {
    index: 2,
    text: 'Intent broadcasted on chain.',
  },
  {
    index: 3,
    text: 'Intent Executed.',
  },
];

function GossipNode({ id }: any) {
  // @ts-expect-error
  const { context, setContext } = useContext(BuildContext);
  const [tree, setTree] = React.useState(null);

  const [progressState, setProgressState] = React.useState(-1);
  const [progressIndex, setProgressIndex] = React.useState(0);

  const edges = useEdges();
  // console.log(edges);

  let isConnected = false;
  edges.map((edge) => {
    if (edge.target == id) {
      isConnected = true;
    }
  });
  // console.log(isConnected);
  //

  useEffect(() => {
    if (progressState == 0.001) {
      setProgressState(0.1);
      setProgressIndex(0);
    } else if (progressState == 0.1) {
      setTimeout(() => {
        setProgressState(0.4);
        setProgressIndex(1);
      }, 1000);
    } else if (progressState == 0.4) {
      setTimeout(() => {
        setProgressState(0.8);
        setProgressIndex(2);
      }, 1000);
    } else if (progressState == 0.8) {
      setTimeout(() => {
        setProgressState(1);
        setProgressIndex(3);
      }, 1000);
    } else if (progressState == 1) {
      setTimeout(() => {
        setProgressState(-1);
      }, 1000);
    }
  }, [progressState]);

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
      {!isConnected && (
        <div className='shadow p-2 text-red-500 text-center text-lg'>
          Please connect the node
        </div>
      )}
      {isConnected && (
        <div className='shadow text-center'>
          {progressState != -1 && (
            <div className=''>
              <div className='my-2'>
                {states.map((state) => {
                  return (
                    <div key={state.index} className='mb-1 flex flex-row'>
                      {progressIndex == state.index && (
                        <icons.doing className='text-gray-300 mr-2 pt-1' />
                      )}
                      {progressIndex > state.index && (
                        <icons.check className='text-green-300 mr-2 pt-1' />
                      )}
                      {progressIndex < state.index && (
                        <icons.pending className='text-gray-300 mr-2 pt-1' />
                      )}
                      <div className=''>{state.text}</div>
                    </div>
                  );
                })}
              </div>
              <ProgressBar intent={Intent.PRIMARY} value={progressState} />
            </div>
          )}
          {progressState == -1 && (
            <div className=' py-4'>
              <Button
                intent={Intent.SUCCESS}
                text={'Gossip intent'}
                onClick={() => setProgressState(0.001)}
              />
            </div>
          )}
        </div>
      )}
      <div className='mt-4 w-48'>
        This is an example of the broadcast of an intent. Of course, this is
        meant to be automated, but I was hoping to show the different steps an
        intent takes while it voyages on the blockchain :)
      </div>
    </BaseNode>
  );
}

export default GossipNode;
