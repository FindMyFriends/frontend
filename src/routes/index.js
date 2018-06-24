// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from '../pages/Layout';
import Default from '../pages/Default';
import { default as AllDemands } from '../pages/Demands';
import { default as AddDemand } from '../pages/Demands/Add';
import { default as SingleDemand } from '../pages/Demand';
import { default as SoulmatesByDemand } from '../pages/Demand/Soulmates';
import { default as SignIn } from '../pages/Sign/In';
import { default as SignOut } from '../pages/Sign/Out';

const Routes = (): BrowserRouter => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout path="/demands/add" component={AddDemand} />
      <Layout path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Layout path="/demands/:id" component={SingleDemand} />
      <Layout path="/demands" component={AllDemands} />
      <Layout path="/sign/in" component={SignIn} />
      <Layout path="/sign/out" component={SignOut} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
