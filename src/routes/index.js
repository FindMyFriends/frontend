// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './../pages/Layout';
import Default from './../pages/Default';

const Routes = (): BrowserRouter => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
    </Switch>
  </BrowserRouter>
);

export default Routes;