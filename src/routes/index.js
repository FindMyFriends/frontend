// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './../pages/Layout';
import Default from './../pages/Default';
import { default as AllDemands } from './../pages/demands/All';

const Routes = (): BrowserRouter => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout path="/demands" component={AllDemands} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
