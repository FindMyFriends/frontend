// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from '../pages/Layout';
import Default from '../pages/Default';
import { default as AllDemands } from '../pages/Demands';
import { default as AddDemand } from '../pages/Demands/Add';
import { default as SingleDemand } from '../pages/Demand';
import { default as ReconsiderDemand } from '../pages/Demand/Reconsider';
import { default as SoulmatesByDemand } from '../pages/Demand/Soulmates';
import { default as SignIn } from '../pages/Sign/In';
import { default as SignOut } from '../pages/Sign/Out';
import { default as AllEvolutions } from '../pages/Evolutions';
import { default as SingleEvolution } from '../pages/Evolution';
import { default as ExtendEvolution } from '../pages/Evolutions/Extend';
import Error404 from '../pages/Error/Error404';
import { loggedIn } from '../access/cookie';

const Routes = (): BrowserRouter => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout onEnter={loggedIn} path="/demands/add" component={AddDemand} />
      <Layout onEnter={loggedIn} path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Layout onEnter={loggedIn} path="/demands/:id/reconsider" component={ReconsiderDemand} />
      <Layout onEnter={loggedIn} path="/demands/:id" component={SingleDemand} />
      <Layout onEnter={loggedIn} path="/demands" component={AllDemands} />
      <Layout path="/sign/in" component={SignIn} />
      <Layout path="/sign/out" component={SignOut} />
      <Layout onEnter={loggedIn} path="/evolutions/:id/extend" component={ExtendEvolution} />
      <Layout onEnter={loggedIn} path="/evolutions/:id" component={SingleEvolution} />
      <Layout onEnter={loggedIn} path="/evolutions" component={AllEvolutions} />
      <Layout path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
