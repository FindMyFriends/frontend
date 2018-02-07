import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlashMessage from './../ui/FlashMessage';

const Layout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <MuiThemeProvider>
        <span>
          <FlashMessage />
          <AppBar
            showMenuIconButton={false}
            iconElementLeft={<span>A</span>}
            title="FMF"
          />
          <Component {...matchProps} />
        </span>
      </MuiThemeProvider>
  )}
  />
);

Layout.propTypes = {
  component: PropTypes.any,
};

export default Layout;
