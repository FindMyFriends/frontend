// @flow
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as session from '../access/session';
import Public from './Public';

type Props = {
  +component: any,
};
export default ({ component: Component, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={props => (
      session.exists()
        ? <Public component={Component} {...props} />
        : <Redirect to={{ pathname: '/sign/in', state: { from: props.location } }} />
    )}
  />
);
