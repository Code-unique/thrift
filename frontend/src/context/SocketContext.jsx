import { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling'], // Ensure correct backend URL
  });
  

  useEffect(() => {
    if (user) {
      socket.emit('joinUser', user._id);
    }
    return () => socket.disconnect();
  }, [user]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

