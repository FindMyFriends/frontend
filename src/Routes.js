import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import All from './pages/demands/All';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Layout} />
      <Route exact path='/demands' component={All} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
