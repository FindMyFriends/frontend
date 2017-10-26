import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import All from './pages/demands/All';
import Reconsider from './pages/demands/Reconsider';
import Add from './pages/demands/Add';
import Single from './pages/demands/Single';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Route path="/demands/add" component={Add} />
      <Route path="/demands/reconsider/:id" component={Reconsider} />
      <Route path="/demands/:id" component={Single} />
      <Route path="/demands" component={All} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
