// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single } from './../../demand/endpoints';
import Loader from './../../ui/Loader';
import Overview from './../../demand/output/Overview';
import { getPrettyDemand } from '../../demand/reducers';
import { DEMAND } from '../../demand/actions';
import { getScopeOptions, isFetching } from '../../schema/reducers';

type Props = {|
  +demand: Object,
  +fetching: boolean,
  +single: (id: string) => (void),
  +match: Object,
|};
class Single extends React.Component<Props, any> {
  componentDidMount() {
    this.props.single(this.props.match.params.id);
  }

  render() {
    const { demand, fetching } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <Overview demand={demand} />
    );
  }
}

const mapStateToProps = state => ({
  demand: getPrettyDemand(state.demand.single, getScopeOptions(state, DEMAND)),
  fetching: state.demand.fetching || isFetching(state, DEMAND),
});
const mapDispatchToProps = dispatch => ({
  single: (id: string) => dispatch(single(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Single);
