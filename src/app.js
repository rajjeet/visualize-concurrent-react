import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from './site/navigation';
import { Pages } from './site/pages';

export const App = () => {
  return (
    <Router>
      <Navigation />
      <Pages />
    </Router>
  );
};

