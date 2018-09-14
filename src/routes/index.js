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
import { default as DemandSpots } from '../pages/Demand/Spots';
import { default as EvolutionSpots } from '../pages/Evolution/Spots';
import { default as SignIn } from '../pages/Sign/In';
import { default as SignUp } from '../pages/Sign/Up';
import { default as SignOut } from '../pages/Sign/Out';
import { default as Activation } from '../pages/Activation';
import { default as AllEvolutions } from '../pages/Evolutions';
import { default as SingleEvolution } from '../pages/Evolution';
import { default as ExtendEvolution } from '../pages/Evolutions/Extend';
import Error404 from '../pages/Error/Error404';
import { loggedIn } from '../access/session';

export default () => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout authenticated={loggedIn} path="/demands/add" component={AddDemand} />
      <Layout authenticated={loggedIn} path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Layout authenticated={loggedIn} path="/demands/:id/spots" component={DemandSpots} />
      <Layout authenticated={loggedIn} path="/demands/:id/reconsider" component={ReconsiderDemand} />
      <Layout authenticated={loggedIn} path="/demands/:id" component={SingleDemand} />
      <Layout authenticated={loggedIn} path="/demands" component={AllDemands} />
      <Layout path="/sign/in" component={SignIn} />
      <Layout path="/sign/up" component={SignUp} />
      <Layout path="/sign/out" component={SignOut} />
      <Layout path="/activation/:code" component={Activation} />
      <Layout authenticated={loggedIn} path="/evolutions/:id/extend" component={ExtendEvolution} />
      <Layout authenticated={loggedIn} path="/evolutions/:id/spots" component={EvolutionSpots} />
      <Layout authenticated={loggedIn} path="/evolutions/:id" component={SingleEvolution} />
      <Layout authenticated={loggedIn} path="/evolutions" component={AllEvolutions} />
      <Layout path="*" component={Error404} />
    </Switch>
  </BrowserRouter>
);
