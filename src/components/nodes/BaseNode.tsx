import { Collapse, EditableText } from '@blueprintjs/core';
import React, { useContext, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa6';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { Handle, Position } from 'reactflow';

import { BuildContext } from '@/data/context';

type HandleType = {
  type: 'source' | 'target';
  position: 'left' | 'right' | 'top' | 'bottom';
};

interface BaseNodeProps {
  title: string;
  leftIcon?: React.ReactElement;
  editable?: boolean;
  collapsable?: boolean;
  titleColor?: string;
  centerTitle?: boolean;
  handles: HandleType[];
  handlePosition?: string;
  children: React.ReactNode;
  nodeId: string;
}

const defaultProps: BaseNodeProps = {
  title: 'Title',
  leftIcon: <RxDragHandleDots2 />,
  editable: false,
  collapsable: true,
  titleColor: 'text-zinc-400',
  centerTitle: false,
  handles: [],
  handlePosition: 'Right',
  children: <div></div>,
  nodeId: '',
};

function getHandlePosition(handlePosition: string) {
  switch (handlePosition) {
    case 'right':
      return Position.Right;
    case 'left':
      return Position.Left;
    case 'top':
      return Position.Top;
    case 'bottom':
      return Position.Bottom;
    default:
      return Position.Right;
  }
}

const BaseNode: React.FC<BaseNodeProps> = ({
  title,
  editable,
  collapsable,
  leftIcon,
  centerTitle,
  titleColor,
  handles,
  children,
  nodeId,
}) => {
  // @ts-expect-error
  const { context, setContext } = useContext(BuildContext);
  const [_title, setTitle] = useState(title);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (context.nodeStates[nodeId]) {
      setCollapsed(context.nodeStates[nodeId]?.collapsed);
    } else {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    setTitle(title);
  }, [title]);

  useEffect(() => {
    setContext((prev: any) => ({
      ...prev,
      nodeStates: { ...prev.nodeStates, [nodeId]: { collapsed: collapsed } },
    }));
  }, [collapsed, nodeId, setContext]);

  return (
    <div className='bp5-dark shadow-2 text-white'>
      {handles.map((handle, index) => (
        <Handle
          key={handle.type}
          type={handle.type}
          position={getHandlePosition(handle.position)}
          isConnectable={true}
          className={`mx-[-12px] h-4 w-4 rounded-full ${
            handle.type == 'source' ? 'bg-rose-500' : 'bg-indigo-600'
          }`}
        />
      ))}
      <div
        className={`node-drag-handle flex min-w-60 cursor-pointer place-content-between rounded-t-lg bg-[#292d39] p-2.5 px-3.5 ${titleColor}`}
      >
        {
          // @ts-expect-error
          React.cloneElement(leftIcon, {
            className: 'mt-0.5 w-4 h-4 inline-block',
          })
        }
        <EditableText
          disabled={!editable}
          className={`bp5-dark ${centerTitle ? '' : 'w-full pl-2'} 
          ${editable ? 'cursor-text' : 'cursor-pointer'}
          mx-2 ${titleColor}`}
          alwaysRenderInput={false}
          maxLength={200}
          maxLines={1}
          minLines={1}
          multiline={false}
          placeholder='Title'
          selectAllOnFocus={false}
          confirmOnEnterKey={true}
          value={_title}
          onChange={setTitle}
          type='text'
        />
        {collapsable && (
          <div
            className='transition duration-300 ease-in-out hover:text-cyan-400'
            onClick={() => collapsable && setCollapsed(!collapsed)}
          >
            {collapsed && <FaCaretDown className='mt-0.5 h-4 w-4 ' />}
            {!collapsed && <FaCaretRight className='mt-0.5 h-4 w-4' />}
          </div>
        )}
      </div>
      <Collapse isOpen={!collapsed} keepChildrenMounted={true}>
        <div className='bg-zinc-800 p-2.5 px-3.5 text-gray-400 transition duration-500 ease-in'>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

BaseNode.defaultProps = defaultProps;

export default BaseNode;
