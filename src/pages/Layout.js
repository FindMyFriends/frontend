import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const Layout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Component {...matchProps} />
        </div>
      </MuiThemeProvider>
  )}
  />
);

Layout.propTypes = {
  component: PropTypes.any,
};

export default Layout;
