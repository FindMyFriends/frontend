import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import All from './pages/demands/All';
import Reconsider from './pages/demands/Reconsider';
import Add from './pages/demands/Add';
import Single from './pages/demands/Single';
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
      <Layout path="/demands/:id" component={Single} />
      <Layout path="/demands" component={All} />
      <Layout path="/sign/in" component={In} />
      <Layout path="/sign/out" component={Out} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
