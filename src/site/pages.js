import React from 'react';
import { Route, Switch } from 'react-router';

export function Pages() {
  return <Switch>
    <Route path={'/'} component={Home} />
  </Switch>;
}

const Home = () => <h1>Home</h1>;