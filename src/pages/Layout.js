// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import MainAppBar from './../menu/MainAppBar';

type LayoutType = {
  +component: any,
};

const Layout = ({ component: Component, ...rest }: LayoutType): Route => (
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