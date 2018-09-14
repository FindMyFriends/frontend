// @flow
import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SignOutIcon from '@material-ui/icons/PowerSettingsNew';
import SignUpIcon from '@material-ui/icons/AccountCircle';
import SignInIcon from '@material-ui/icons/ExitToApp';
import { default as DemandIcon } from '../../../demand/output/Icon';
import { default as EvolutionIcon } from '../../../evolution/output/Icon';
import ListItemLink from './ListItemLink';
import { loggedIn } from '../../../access/session';

const drawerWidth = 240;

const Root = styled.div`
  display: flex;
  flex-grow: 1;
  height: 430;
  z-index: 1;
  overflow: hidden;
  position: relative;
`;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

type Props = {|
  +classes: Object,
  +theme: Object,
  +component: Object,
|};
type State = {|
  open: boolean,
|};
class MainAppBar extends React.Component<Props, State> {
  state = {
    open: false,
  };

  handleDrawerOpen = () => this.setState({ open: true });

  handleDrawerClose = () => this.setState({ open: false });

  render() {
    const { classes, theme, component } = this.props;
    return (
      <Root>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>Frontend</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={this.state.open}
          classes={
            { paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose) }
          }
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <React.Fragment>
              {loggedIn() ? <ListItemLink href="/demands" icon={<DemandIcon />}>Demands</ListItemLink> : null}
              {loggedIn() ? <ListItemLink href="/evolutions" icon={<EvolutionIcon />}>Evolutions</ListItemLink> : null}
            </React.Fragment>
          </List>
          {loggedIn() ? <Divider /> : null}
          <List>
            <React.Fragment>
              {
                loggedIn()
                  ? (<ListItemLink href="/sign/out" icon={<SignOutIcon />}>Sign out</ListItemLink>)
                  : (
                    <React.Fragment>
                      <ListItemLink href="/sign/in" icon={<SignInIcon />}>Sign in</ListItemLink>
                      <ListItemLink href="/sign/up" icon={<SignUpIcon />}>Sign up</ListItemLink>
                    </React.Fragment>
                  )
              }
            </React.Fragment>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {component}
        </main>
      </Root>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainAppBar);
