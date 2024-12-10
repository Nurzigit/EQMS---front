import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerPanel = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get('http://localhost:5000/queue', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQueue(response.data);
      } catch (error) {
        alert('Failed to fetch queue');
      }
    };
    fetchQueue();
  }, []);

  const callNext = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/queue/next',
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(`Called: ${response.data.number}`);
    } catch (error) {
      alert('Failed to call next');
    }
  };

  return (
    <div>
      <h1>Manager Panel</h1>
      <button onClick={callNext}>Call Next</button>
      <ul>
        {queue.map((item) => (
          <li key={item.number}>Number: {item.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerPanel;