import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <div>
        <Link to={'/suspense'}>Suspense</Link>
        <Link to={'/transitions'}>Transitions</Link>
        <Link to={'/high-low-priority-state'}>High/Low Priority State</Link>
        <Link to={'/deferring-state'}>Deferring State</Link>
        <Link to={'/suspense-list'}>Suspense List</Link>
      </div>
      <Switch>
        <Route />
      </Switch>
    </Router>
  );
};