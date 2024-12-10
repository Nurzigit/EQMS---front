import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const QueueMonitor = () => {
  const [queue, setQueue] = useState([]);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('queue-update', (data) => {
      setQueue((prev) => [...prev, data]);
    });
    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <h1>Queue Monitor</h1>
      <ul>
        {queue.map((item) => (
          <li key={item.number}>Called: {item.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueueMonitor;