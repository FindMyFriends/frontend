import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import Notification from './../ui/Notification';

class Layout extends React.Component {
  state = {
    opened: false,
  };

  handleDrawerOpening = this.handleDrawerOpening.bind(this);

  handleDrawerOpening() {
    this.setState(...this.state, { opened: !this.state.opened });
  }

  render() {
    const { component: Component, menuItems, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <MuiThemeProvider>
            <span>
              <Notification />
              <AppBar
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                title="FMF"
                onLeftIconButtonClick={this.handleDrawerOpening}
              />
              <Drawer
                open={this.state.opened}
                docked={false}
                onRequestChange={this.handleDrawerOpening}
              >
                {menuItems}
              </Drawer>
              <Component {...matchProps} />
            </span>
          </MuiThemeProvider>
      )}
      />
    );
  }
}

Layout.propTypes = {
  component: PropTypes.any,
  menuItems: PropTypes.array.isRequired,
};

export default connect(state => ({
  menuItems: state.menu.items || [],
}))(Layout);
