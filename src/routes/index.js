// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from '../pages/Layout';
import Default from '../pages/Default';
import { default as AllDemands } from '../pages/Demands';
import { default as SingleDemand } from '../pages/Demand';
import { default as SoulmatesByDemand } from '../pages/Demand/Soulmates';

const Routes = (): BrowserRouter => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Layout path="/demands/:id" component={SingleDemand} />
      <Layout path="/demands" component={AllDemands} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
