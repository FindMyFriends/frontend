// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { default as MaterialTabs } from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export const DEMAND_TYPE = 'demand';
export const SOULMATES_TYPE = 'soulmates';

const styles = theme => ({
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

type Props = {|
  +type: string,
  +id: string,
  +soulmateTotal: number,
  +classes: Object,
|};
type State = {|
  type: string,
|};
class Tabs extends React.Component<Props, State> {
  state = {
    type: DEMAND_TYPE,
  };

  componentDidMount() {
    this.resetType();
  }

  resetType = () => this.setState({ type: this.props.type });
  handleChange = (event: any, type: string) => this.setState({ type });

  render() {
    return (
      <Paper>
        <MaterialTabs
          value={this.state.type}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            value={DEMAND_TYPE}
            label="Demand"
            component={Link}
            to={`/demands/${this.props.id}`}
          />
          <Tab
            value={SOULMATES_TYPE}
            label={
              <Badge color="primary" className={this.props.classes.padding} badgeContent={this.props.soulmateTotal}>
                Soulmates
              </Badge>
            }
            component={Link}
            to={`/demands/${this.props.id}/soulmates`}
          />
        </MaterialTabs>
      </Paper>
    );
  }
}

export default withStyles(styles)(Tabs);