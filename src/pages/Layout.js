import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import Notification from './../ui/Notification';
import { items as demandMenuItems } from './../demand/output/menu';

class Layout extends React.Component {
  state = {
    opened: false,
  };

  handleDrawerOpening = this.handleDrawerOpening.bind(this);

  handleDrawerOpening() {
    this.setState(...this.state, { opened: !this.state.opened });
  }

  menuItems(history, match, dispatch) {
    const menuItems = demandMenuItems(history, match, dispatch);
    return menuItems[match.path]();
  }

  render() {
    const { component: Component, ...rest } = this.props;
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
              {this.menuItems(matchProps.history, matchProps.match, this.props.dispatch)}
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
};

export default connect()(Layout);
