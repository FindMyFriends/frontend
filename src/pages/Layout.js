// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import MainAppBar from './../menu/MainAppBar';

type Props = {
  +component: any,
};
const Layout = ({ component: Component, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={(props) => (
      <React.Fragment>
        <MainAppBar component={<Component {...props} />} />
      </React.Fragment>
    )}
  />
);

export default Layout;