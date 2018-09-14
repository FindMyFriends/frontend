// @flow
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as session from '../access/session';
import { refresh } from '../token/endpoints';
import Public from './Public';

type Props = {
  +component: any,
};
export default ({ component: Component, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={(props) => {
      const { authenticated } = {
        authenticated: () => false,
        ...rest,
      };
      if (authenticated() && session.expired()) {
        refresh(
          session.getValue(),
          data => session.start({ value: data.token, expiration: data.expiration }),
        );
      }
      if (authenticated()) {
        return (
          <Public component={Component} {...props} />
        );
      }
      return (
        <Redirect
          to={{
            pathname: '/sign/in',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
