// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single } from '../../demand/endpoints';
import { info as soulmateInfo } from '../../soulmate/endpoints';
import Loader from '../../ui/Loader';
import Overview from '../../demand/output/Overview';
import { getPrettyDemand } from '../../demand/reducers';
import { getSoulmateTotal } from '../../soulmate/reducers';
import { DEMAND } from '../../demand/actions';
import { getScopeOptions, isFetching } from '../../schema/reducers';
import { default as Tabs, DEMAND_TYPE } from './menu/Tabs';

type Props = {|
  +demand: Object,
  +fetching: boolean,
  +single: (id: string) => (void),
  +soulmateInfo: (id: string) => (void),
  +match: Object,
  +soulmateTotal: number,
|};
class Demand extends React.Component<Props, any> {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.single(id);
    this.props.soulmateInfo(id);
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

const mapStateToProps = state => ({
  demand: getPrettyDemand(state.demand.single, getScopeOptions(state, DEMAND)),
  soulmateTotal: getSoulmateTotal(state),
  fetching: state.demand.fetching || isFetching(state, DEMAND) || state.soulmate.fetching,
});
const mapDispatchToProps = dispatch => ({
  single: (id: string) => dispatch(single(id)),
  soulmateInfo: (id: string) => dispatch(soulmateInfo(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Demand);