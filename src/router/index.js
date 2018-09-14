// @flow
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
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
import Public from './Public';
import Private from './Private';

export default () => (
  <BrowserRouter>
    <Switch>
      <Public exact path="/" component={Default} />
      <Private authenticated={loggedIn} path="/demands/add" component={AddDemand} />
      <Private authenticated={loggedIn} path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Private authenticated={loggedIn} path="/demands/:id/spots" component={DemandSpots} />
      <Private authenticated={loggedIn} path="/demands/:id/reconsider" component={ReconsiderDemand} />
      <Private authenticated={loggedIn} path="/demands/:id" component={SingleDemand} />
      <Private authenticated={loggedIn} path="/demands" component={AllDemands} />
      <Public path="/sign/in" component={SignIn} />
      <Public path="/sign/up" component={SignUp} />
      <Public path="/sign/out" component={SignOut} />
      <Public path="/activation/:code" component={Activation} />
      <Private authenticated={loggedIn} path="/evolutions/:id/extend" component={ExtendEvolution} />
      <Private authenticated={loggedIn} path="/evolutions/:id/spots" component={EvolutionSpots} />
      <Private authenticated={loggedIn} path="/evolutions/:id" component={SingleEvolution} />
      <Private authenticated={loggedIn} path="/evolutions" component={AllEvolutions} />
      <Public component={Error404} />
    </Switch>
  </BrowserRouter>
);
