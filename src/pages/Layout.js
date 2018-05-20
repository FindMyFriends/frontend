import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import Notification from './../ui/Notification';
import { loggedIn } from '../access/cookie';

class Layout extends React.Component {
  state = {
    opened: false,
    menu: {
      filter: {
        title: null,
      },
      action: null,
    },
  };

  handleDrawerOpening = () => {
    this.setState(...this.state, { opened: !this.state.opened });
  };

  handleMenu = (menu) => {
    this.setState({
      ...this.state,
      menu,
    });
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { menu } = this.state;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <MuiThemeProvider>
            <React.Fragment>
              <Notification />
              <AppBar
                title={menu.filter.title}
                onLeftIconButtonClick={this.handleDrawerOpening}
                iconElementRight={menu.action}
                showMenuIconButton
              />
              <Drawer
                open={this.state.opened}
                docked={false}
                onRequestChange={this.handleDrawerOpening}
              >
                <React.Fragment>
                  <Link to="/demands">
                    <MenuItem onClick={this.handleDrawerOpening}>Demands</MenuItem>
                  </Link>
                  {
                    loggedIn() ? (
                      <Link to="/sign/out">
                        <MenuItem onClick={this.handleDrawerOpening}>Sign out</MenuItem>
                      </Link>
                    ) : (
                      <Link to="/sign/in">
                        <MenuItem onClick={this.handleDrawerOpening}>Sign in</MenuItem>
                      </Link>
                    )
                  }
                </React.Fragment>
              </Drawer>
              <Component {...matchProps} handleMenu={this.handleMenu} />
            </React.Fragment>
          </MuiThemeProvider>
        )}
      />
    );
  }
}

Layout.propTypes = {
  component: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Layout);
