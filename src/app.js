import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from './site/navigation';
import { Pages } from './site/pages';

export const App = () => {
  return (
    <Router>
      <h1>Visualize React Concurrency</h1>
      <Navigation />
      <Pages />
    </Router>
  );
};

