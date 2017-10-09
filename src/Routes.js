import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import All from './pages/demands/All';
import Single from './pages/demands/Single';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Layout} />
      <Route path='/demands/:id' component={Single} />
      <Route path='/demands' component={All} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
