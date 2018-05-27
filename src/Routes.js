import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import { default as AllDemands } from './pages/demands/All';
import { default as AllEvolutions } from './pages/evolutions/All';
import { default as ExtendEvolution } from './pages/evolutions/Extend';
import Reconsider from './pages/demands/Reconsider';
import Add from './pages/demands/Add';
import { default as SingleDemand } from './pages/demands/Single';
import { default as SingleEvolution } from './pages/evolutions/Single';
import Default from './pages/Default';
import Soulmates from './pages/demands/Soulmates';
import In from './pages/sign/In';
import Out from './pages/sign/Out';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout path="/demands/add" component={Add} />
      <Layout path="/demands/:id/reconsider" component={Reconsider} />
      <Layout path="/demands/:id/soulmates" component={Soulmates} />
      <Layout path="/demands/:id" component={SingleDemand} />
      <Layout path="/demands" component={AllDemands} />
      <Layout path="/evolutions/:id/extend" component={ExtendEvolution} />
      <Layout path="/evolutions/:id" component={SingleEvolution} />
      <Layout path="/evolutions" component={AllEvolutions} />
      <Layout path="/sign/in" component={In} />
      <Layout path="/sign/out" component={Out} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
