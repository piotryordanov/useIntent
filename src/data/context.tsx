'use client';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

import strategies from '@/data/sample_strategies';

import { BuildContextType, Context } from '@/types/Context';

export const BuildContext = createContext<BuildContextType | null>(null);

const initialState: Context = {
  strategies: strategies,
  selectedStrategy: 0,
  nodeStates: {},
};

const BuildProvider = ({ children }: { children: any }) => {
  const [context, setContext] = useState<Context>();

  useEffect(() => {
    if (context == null) {
      if (localStorage.getItem('context') !== null) {
        const storedContext = localStorage.getItem('context');
        if (storedContext !== null) {
          setContext(JSON.parse(storedContext));
        } else {
          setContext(initialState);
        }
      } else {
        setContext(initialState);
      }
    } else {
      localStorage.setItem('context', JSON.stringify(context));
    }
  }, [context]);

  if (!context) return null;

  const setSetting = (key: string, value: any) => {
    setContext((prevContext: any) => {
      const newContext = { ...prevContext };
      const settings =
        newContext.strategies[newContext.selectedStrategy].settings;
      newContext.strategies[newContext.selectedStrategy].settings = {
        ...settings,
        [key]: value,
      };
      return newContext;
    });
  };

  const updateNodeState = (nodeId: string, state: string) => {
    setContext((prevContext: any) => {
      prevContext.nodeStates[nodeId] = state;
      return { ...prevContext };
    });
  };

  return (
    <BuildContext.Provider
      value={{
        context,
        setContext,
        // @ts-expect-error
        setSetting,
        updateNodeState,
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export default BuildProvider;
