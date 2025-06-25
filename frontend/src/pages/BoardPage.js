import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Column from '../components/Column';

export default function BoardPage() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    // Замените на ваш реальный API endpoint
    fetch('http://localhost:5000/api/bugs')
      .then(res => res.json())
      .then(data => setBugs(data));
  }, []);

  const statuses = [
    { id: 'open', title: 'To Do' },
    { id: 'progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  return (
    <div className="board-page">
      <Header />
      <div className="board">
        {statuses.map(status => (
          <Column
            key={status.id}
            title={status.title}
            bugs={bugs.filter(bug => bug.status === status.id)}
          />
        ))}
      </div>
    </div>
  );
}