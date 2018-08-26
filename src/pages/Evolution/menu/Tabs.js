// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { default as MaterialTabs } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

export const EVOLUTION_TYPE = 'demand';
export const SPOTS_TYPE = 'spots';

type Props = {|
  +type: string,
  +id: string,
|};
type State = {|
  type: string,
|};
class Tabs extends React.Component<Props, State> {
  state = {
    type: EVOLUTION_TYPE,
  };

  componentDidMount = () => this.resetType();

  resetType = () => this.setState({ type: this.props.type });
  handleChange = (event: any, type: string) => this.setState({ type });

  render() {
    const { id } = this.props;
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
            value={EVOLUTION_TYPE}
            label="Evolution"
            component={Link}
            to={`/evolutions/${id}`}
          />
          <Tab
            value={SPOTS_TYPE}
            label="Spots"
            component={Link}
            to={`/evolutions/${id}/spots`}
          />
        </MaterialTabs>
      </Paper>
    );
  }
}

export default Tabs;
