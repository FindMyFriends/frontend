// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import MainAppBar from '../pages/Layout/menu/MainAppBar';
import Error404 from '../pages/Error/Error404';
import Notification from '../ui/Notification';
import * as session from '../access/session';

type Props = {
  +component: any,
  +restrictive?: boolean,
};
const Public = ({ component: Component, restrictive = false, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={props => (
      restrictive && session.exists()
        ? <Public component={Error404} {...props} />
        : (
          <React.Fragment>
            <Notification />
            <MainAppBar component={<Component {...props} />} />
          </React.Fragment>
        )
    )}
  />
);

export default Public;
