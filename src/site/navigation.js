import { Link } from 'react-router-dom';
import React from 'react';

export function Navigation() {
  return <div>
    <Link to={'/suspense'}>Suspense</Link>
    <Link to={'/transitions'}>Transitions</Link>
    <Link to={'/high-low-priority-state'}>High/Low Priority State</Link>
    <Link to={'/deferring-state'}>Deferring State</Link>
    <Link to={'/suspense-list'}>Suspense List</Link>
  </div>;
}