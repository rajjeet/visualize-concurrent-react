import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from './site/navigation';
import { Index } from './pages';

export const App = () => {
  return (
    <Router>
      <h1>Visualize React Concurrency</h1>
      <Navigation />
      <Index />
    </Router>
  );
};

