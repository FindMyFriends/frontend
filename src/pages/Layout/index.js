// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import Notification from '../../ui/Notification';
import MainAppBar from './menu/MainAppBar';
import Error403 from '../Error/Error403';

type Props = {
  +component: any,
};
export default ({ component: Component, ...rest }: Props): Route => (
  <Route
    {...rest}
    render={(props) => {
      const outerProps = {
        onEnter: () => true,
        ...rest,
      };
      let page = null;
      if (outerProps.onEnter()) {
        page = <Component {...props} />;
      } else {
        page = <Error403 {...props} />;
      }
      return (
        <React.Fragment>
          <Notification />
          <MainAppBar component={page} />
        </React.Fragment>
      );
    }}
  />
);
