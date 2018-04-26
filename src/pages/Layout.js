import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import Notification from './../ui/Notification';

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

  handleDrawerOpening = this.handleDrawerOpening.bind(this);
  handleClick = this.handleClick.bind(this);
  handleMenu = this.handleMenu.bind(this);

  handleDrawerOpening() {
    this.setState(...this.state, { opened: !this.state.opened });
  }

  handleClick(actions) {
    actions.forEach(action => action());
  }

  handleMenu(menu) {
    this.setState({
      ...this.state,
      menu,
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { menu } = this.state;
    return (
      <Route
        {...rest}
        render={(matchProps) => {
          const { history, match } = matchProps;
          return (
            <MuiThemeProvider>
              <span>
                <Notification />
                <AppBar
                  title={menu.filter.title}
                  onLeftIconButtonClick={this.handleDrawerOpening}
                  iconElementRight={menu.action}
                  showMenuIconButton={!!menu.action}
                />
                <Drawer
                  open={this.state.opened}
                  docked={false}
                  onRequestChange={this.handleDrawerOpening}
                >
                  <React.Fragment>
                    <MenuItem key={1} onClick={() => this.handleClick([() => history.push(`/demands/${match.params.id}`), this.handleDrawerOpening])}>Demands</MenuItem>
                  </React.Fragment>
                </Drawer>
                <Component {...matchProps} handleMenu={this.handleMenu} />
              </span>
            </MuiThemeProvider>
          );
      }}
      />
    );
  }
}

Layout.propTypes = {
  component: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Layout);
