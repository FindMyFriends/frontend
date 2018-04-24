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

const DropDownMenu = ({ children, items }) => {
  const style = {
    cursor: 'pointer',
  };
  return (
    <React.Fragment>
      {children}
      <IconMenu
            iconButtonElement={
              <i className="material-icons" style={style}>
                keyboard_arrow_down
              </i>
            }
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          {items}
        </IconMenu>
    </React.Fragment>
  );
};

class Layout extends React.Component {
  state = {
    opened: false,
  };

  handleDrawerOpening = this.handleDrawerOpening.bind(this);

  handleDrawerOpening() {
    this.setState(...this.state, { opened: !this.state.opened });
  }

  menuItems(history, match, dispatch) {
    const menuItems = dispatch(demandMenuItems(history, match));
    if (Object.prototype.hasOwnProperty.call(menuItems, match.path)) {
      return menuItems[match.path](this.handleDrawerOpening);
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
                  title={
                    <DropDownMenu items={items}>Demands</DropDownMenu>
                  }
                  onLeftIconButtonClick={this.handleDrawerOpening}
                  showMenuIconButton={!!items}
                />
                <Drawer
                  open={this.state.opened}
                  docked={false}
                  onRequestChange={this.handleDrawerOpening}
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
