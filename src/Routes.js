import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './pages/Layout';
import All from './pages/demands/All';
import Reconsider from './pages/demands/Reconsider';
import Add from './pages/demands/Add';
import Single from './pages/demands/Single';
import Default from './pages/Default';
import Soulmates from './pages/demands/Soulmates';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={Default} />
      <Layout path="/demands/add" component={Add} />
      <Layout path="/demands/:id/reconsider" component={Reconsider} />
      <Layout path="/demands/:id/soulmates" component={Soulmates} />
      <Layout path="/demands/:id" component={Single} />
      <Layout path="/demands" component={All} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
