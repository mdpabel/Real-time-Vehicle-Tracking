import {createContext, useContext} from 'react';

export const contextFactory = () => {
  const context = createContext();

  const useCtx = () => {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error('useContext must be used inside a provider with a value');
    }
    return ctx;
  };

  return [useCtx, context];
};
