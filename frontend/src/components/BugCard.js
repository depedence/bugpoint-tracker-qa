import React from 'react';

export default function BugCard({ bug }) {
  return (
    <div className="bug-card" draggable="true">
      <h4>{bug.title}</h4>
      <p>{bug.description}</p>
      <div className="bug-footer">
        <span className="priority">{bug.priority}</span>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
}