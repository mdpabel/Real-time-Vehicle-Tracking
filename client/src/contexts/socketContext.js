import React, {useState, useEffect, useMemo} from 'react';
import {io} from 'socket.io-client';
import {contextFactory} from '../helper/contextFactory';

const [useSocketContext, SocketContext] = contextFactory();

const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState({});
  useEffect(() => {
    let t = io.connect('http://192.168.1.101:3003/', {
      transports: ['websocket'],
    });
    setSocket(t);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export {SocketContextProvider, useSocketContext};
