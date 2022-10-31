import React, {useState} from 'react';
import {contextFactory} from '../helper/contextFactory';

const [useDarkMode, DarkModeContext] = contextFactory();

const DarkModeCOntextProvider = ({children}) => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    setOn(prev => !prev);
  };

  const values = {
    on,
    setOn,
    toggle,
  };

  return (
    <DarkModeContext.Provider value={values}>
      {children}
    </DarkModeContext.Provider>
  );
};

export {DarkModeCOntextProvider, useDarkMode};
