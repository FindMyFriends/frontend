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
import { items as demandMenuItems } from './../demand/output/menu';

class Layout extends React.Component {
  menuItems(history, match, dispatch) {
    const menuItems = dispatch(demandMenuItems(history, match));
    if (Object.prototype.hasOwnProperty.call(menuItems, match.path)) {
      return menuItems[match.path]();
    }
    return null;
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(matchProps) => {
          const items = this.menuItems(matchProps.history, matchProps.match, this.props.dispatch);
          return (
            <MuiThemeProvider>
              <span>
                <Notification />
                <AppBar
                  title="Demand"
                  onLeftIconButtonClick={this.handleDrawerOpening}
                  iconElementRight={items}
                  showMenuIconButton={!!items}
                />
                <Drawer
                  open={false}
                  docked={false}
                  onRequestChange={() => {}}
                >
                  {items}
                </Drawer>
                <Component {...matchProps} />
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
