// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { default as MaterialTabs } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const DEMAND_TYPE = 'demand';
export const SOULMATES_TYPE = 'soulmates';

type State = {|
  value: string,
|};
class Tabs extends React.Component<any, State> {
  state = {
    value: DEMAND_TYPE,
  };

  handleChange = (event: any, value: string) => this.setState({ value });

  render() {
    return (
      <Paper>
        <MaterialTabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab value={DEMAND_TYPE} label="Demand" />
          <Tab value={SOULMATES_TYPE} label="Soulmates" />
        </MaterialTabs>
      </Paper>
    );
  }
}

export default Tabs;
