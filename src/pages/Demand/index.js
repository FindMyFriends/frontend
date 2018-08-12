// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single, options } from '../../demand/endpoints';
import { info as soulmateInfo } from '../../soulmate/endpoints';
import Loader from '../../ui/Loader';
import Overview from '../../demand/output/Overview';
import { getById, getPrettyDemand, isFetching as isDemandFetching } from '../../demand/reducers';
import { getTotal, isFetching as isSoulmateFetching } from '../../soulmate/reducers';
import { DEMAND } from '../../demand/actions';
import { getScopeOptions, isFetching as isSchemaFetching } from '../../schema/reducers';
import { default as Tabs, DEMAND_TYPE } from './menu/Tabs';
import { history as spotHistory } from '../../demand/spot/endpoints';
import { isSpotsFetching, spotsByDemand } from '../../spot/reducers';

type Props = {|
  +options: () => (void),
  +demand: Object,
  +spots: Array<Object>,
  +fetching: boolean,
  +single: (string) => (void),
  +spotHistory: (string) => (void),
  +soulmateInfo: (string) => (void),
  +match: Object,
  +soulmateTotal: number,
|};
class Demand extends React.Component<Props, any> {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.options();
    this.props.single(id);
    this.props.soulmateInfo(id);
    this.props.spotHistory(id);
  }

  render() {
    const {
      demand,
      fetching,
      match: { params: { id } },
      soulmateTotal,
      spots,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={DEMAND_TYPE} id={id} soulmateTotal={soulmateTotal} />
        <Overview demand={demand} spots={spots} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  spots: spotsByDemand(state.spot, id),
  demand: getPrettyDemand(getById(id, state), getScopeOptions(state, DEMAND)),
  soulmateTotal: getTotal(id, state),
  fetching: isDemandFetching(id, state)
    || isSchemaFetching(state, DEMAND)
    || isSoulmateFetching(id, state)
    || isSpotsFetching(state.spot),
});
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  single: (demand: string) => dispatch(single(demand)),
  spotHistory: (demand: string) => dispatch(spotHistory(demand)),
  soulmateInfo: (demand: string) => dispatch(soulmateInfo(demand)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Demand);
