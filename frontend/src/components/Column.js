import React from 'react';
import BugCard from './BugCard';

export default function Column({ title, bugs }) {
  return (
    <div className="column">
      <h3 className="column-title">{title}</h3>
      <div className="bugs-list">
        {bugs.map(bug => (
          <BugCard key={bug.id} bug={bug} />
        ))}
      </div>
    </div>
  );
}