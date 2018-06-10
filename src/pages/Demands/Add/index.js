// @flow
import React from 'react';
import { connect } from 'react-redux';
import { flatten, unflatten } from 'flat';
import merge from 'lodash/merge';
import Loader from '../../../ui/Loader';
import NestedStepper from '../../../components/NestedStepper';
import { getScopeOptions, isFetching } from '../../../schema/reducers';
import { DEMAND } from '../../../demand/actions';
import { options } from '../../../demand/endpoints';
import {
  getEthnicGroups,
  getSex,
} from '../../../description/selects';

type Props = {|
  +selects: Object,
  +options: () => (void),
  +fetching: boolean,
|};
class Add extends React.Component<Props> {
  state = {
    demand: {
      general: {
        firstname: '',
        sex: '',
        ethnic_group_id: '',
        age: '',
      },
    },
  };

  componentDidMount() {
    this.props.options();
  }

  handleChange = name => event => (
    this.setState({
      demand: {
        ...merge(
          this.state.demand,
          unflatten({ [name]: event.target.value }),
        ),
      },
    })
  );

  render() {
    if (this.props.fetching) {
      return <Loader />;
    }
    return (
      <NestedStepper
        onChange={this.handleChange}
        values={flatten(this.state.demand)}
        selects={this.props.selects}
      />
    );
  }
}

const mapStateToProps = state => ({
  selects: {
    sex: getSex(getScopeOptions(state, DEMAND)),
    ethnicGroups: getEthnicGroups(getScopeOptions(state, DEMAND)),
  },
  fetching: isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Add);
