// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Notification from './../ui/Notification';
import MainAppBar from './../menu/MainAppBar';

type Props = {
  +component: any,
};
const Layout = ({ component: Component, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={props => (
      <React.Fragment>
        <Notification />
        <MainAppBar component={<Component {...props} />} />
      </React.Fragment>
    )}
  />
);

export default Layout;
