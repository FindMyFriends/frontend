// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single, options } from '../../demand/endpoints';
import { info as soulmateInfo } from '../../soulmate/endpoints';
import Loader from '../../ui/Loader';
import Overview from '../../demand/output/Overview';
import { getPrettyDemand } from '../../demand/reducers';
import { getSoulmateTotal } from '../../soulmate/reducers';
import { DEMAND } from '../../demand/actions';
import { getScopeOptions, isFetching } from '../../schema/reducers';
import { default as Tabs, DEMAND_TYPE } from './menu/Tabs';
import { history as locationHistory } from '../../demand/spot/endpoints';

type Props = {|
  +options: () => (void),
  +demand: Object,
  +fetching: boolean,
  +single: (string) => (void),
  +locationHistory: (string) => (void),
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
    this.props.locationHistory(id);
  }

  render() {
    const {
      demand,
      fetching,
      match: { params: { id } },
      soulmateTotal,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={DEMAND_TYPE} id={id} soulmateTotal={soulmateTotal} />
        <Overview demand={demand} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const demand = getPrettyDemand(state.demand.single.payload, getScopeOptions(state, DEMAND));
  demand.spots = state.demand.spots.payload;
  return {
    demand,
    soulmateTotal: getSoulmateTotal(state),
    fetching: state.demand.single.fetching || isFetching(state, DEMAND) || state.soulmate.fetching,
  };
};
const mapDispatchToProps = dispatch => ({
  options: () => dispatch(options()),
  single: (id: string) => dispatch(single(id)),
  locationHistory: (id: string) => dispatch(locationHistory(id)),
  soulmateInfo: (id: string) => dispatch(soulmateInfo(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Demand);
