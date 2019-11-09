import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { ParallelFetchAndRender } from './parallel-fetch-and-render';
import { Transitions } from './transitions';
import { HighLowPriorityState } from './high-low-priority-state';
import { DeferringState } from './deferring-state';
import { SuspenseList } from './suspense-list';

export function Index() {
  return <Switch>
    <Route exact path={'/'} component={Home} />
    <Route exact path={'/parallel-fetch-and-render'} component={ParallelFetchAndRender} />
    <Route exact path={'/transitions'} component={Transitions} />
    <Route exact path={'/high-low-priority-state'} component={HighLowPriorityState} />
    <Route exact path={'/deferring-state'} component={DeferringState} />
    <Route exact path={'/suspense-list'} component={SuspenseList} />
  </Switch>;
}

