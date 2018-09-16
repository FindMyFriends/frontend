// @flow
import React from 'react';
import { Router, Switch } from 'react-router-dom';
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
import Public from './Public';
import Private from './Private';

type Props = {|
  +history: Object,
|};
export default ({ history }: Props) => (
  <Router history={history}>
    <Switch>
      <Public exact path="/" component={Default} />
      <Private path="/demands/add" component={AddDemand} />
      <Private path="/demands/:id/soulmates" component={SoulmatesByDemand} />
      <Private path="/demands/:id/spots" component={DemandSpots} />
      <Private path="/demands/:id/reconsider" component={ReconsiderDemand} />
      <Private path="/demands/:id" component={SingleDemand} />
      <Private path="/demands" component={AllDemands} />
      <Public restrictive path="/sign/in" component={SignIn} />
      <Public restrictive path="/sign/up" component={SignUp} />
      <Private path="/sign/out" component={SignOut} />
      <Public restrictive path="/activation/:code" component={Activation} />
      <Private path="/evolutions/:id/extend" component={ExtendEvolution} />
      <Private path="/evolutions/:id/spots" component={EvolutionSpots} />
      <Private path="/evolutions/:id" component={SingleEvolution} />
      <Private path="/evolutions" component={AllEvolutions} />
      <Public component={Error404} />
    </Switch>
  </Router>
);
