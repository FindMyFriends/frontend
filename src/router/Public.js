// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import MainAppBar from '../pages/Layout/menu/MainAppBar';
import Notification from '../ui/Notification';

type Props = {
  +component: any,
};
export default ({ component: Component, ...rest }: Props): Route => (
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
