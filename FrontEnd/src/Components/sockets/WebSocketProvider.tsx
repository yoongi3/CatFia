import React, { createContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type WebSocketContextType = {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
});

type WebSocketProviderProps = {
  url: string;
  children: React.ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ url, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  
  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.close()
    };
  }, [url]);

  return (
    <WebSocketContext.Provider value={{socket}}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };

