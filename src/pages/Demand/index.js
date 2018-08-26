// @flow
import React from 'react';
import { connect } from 'react-redux';
import { single, options } from '../../demand/endpoints';
import { info as soulmateInfo } from '../../soulmate/endpoints';
import Loader from '../../ui/Loader';
import Overview from '../../demand/output/Overview';
import { getById, getPrettyDemand, singleFetching as demandFetching } from '../../demand/selects';
import { getTotal, singleFetching as soulmateFetching } from '../../soulmate/selects';
import { DEMAND } from '../../demand/actions';
import { getScopeOptions, isFetching as schemaFetching } from '../../schema/selects';
import { default as Tabs, DEMAND_TYPE } from './menu/Tabs';

type Props = {|
  +demand: Object,
  +fetching: boolean,
  +single: (string) => (void),
  +soulmateInfo: (string) => (void),
  +match: Object,
  +soulmateTotal: number,
|};
class Demand extends React.Component<Props, any> {
  componentDidMount = () => {
    const { match: { params: { id } } } = this.props;
    this.props.single(id);
    this.props.soulmateInfo(id);
  };

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

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  demand: getPrettyDemand(getById(id, state), getScopeOptions(state, DEMAND)),
  soulmateTotal: getTotal(id, state),
  fetching: demandFetching(id, state)
    || schemaFetching(state, DEMAND)
    || soulmateFetching(id, state),
});
const mapDispatchToProps = dispatch => ({
  single: (demand: string) => dispatch(single(demand, [], dispatch(options()))),
  soulmateInfo: (demand: string) => dispatch(soulmateInfo(demand)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Demand);
