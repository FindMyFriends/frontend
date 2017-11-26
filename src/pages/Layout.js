import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from './Header';

const Layout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div>
        <Header />
        <div className="container-fluid text-center">
          <div className="row content">
            <div className="col-sm-10 col-sm-offset-1 text-left">
              <Component {...matchProps} />
            </div>
          </div>
        </div>
      </div>
  )}
  />
);

Layout.propTypes = {
  component: PropTypes.any,
};

export default Layout;
