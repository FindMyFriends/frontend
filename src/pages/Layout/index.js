// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Notification from '../../ui/Notification';
import MainAppBar from './menu/MainAppBar';
import Error403 from '../Error/Error403';
import * as session from '../../access/session';
import { refresh } from '../../token/endpoints';

type AuthenticatedPageType = {|
  +component: any,
  +authenticated: boolean,
  +props: Object,
|};
const AuthenticatedPage = ({
  component: Component,
  authenticated,
  props,
}: AuthenticatedPageType) => {
  if (authenticated) {
    return <Component {...props} />;
  }
  return <Error403 {...props} />;
};

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
      return (
        <React.Fragment>
          <Notification />
          <MainAppBar
            component={(
              <AuthenticatedPage
                component={Component}
                authenticated={{
                  authenticated: () => true,
                  ...rest,
                }.authenticated()}
                props={props}
              />
            )}
          />
        </React.Fragment>
      );
    }}
  />
);
