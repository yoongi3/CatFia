import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('ws://localhost:5001');

const WebSocketConnection: React.FC = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');

      socket.emit('testMessage', 'Hello from frontend!');
      socket.emit('testMessage', 'Nihao');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default WebSocketConnection;

