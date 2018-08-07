// @flow
import React from 'react';
import { connect } from 'react-redux';
import { history as spotHistory } from '../../../demand/spot/endpoints';
import Loader from '../../../ui/Loader';
import { default as Tabs, SPOTS_TYPE } from '../menu/Tabs';
import type { SortType } from '../../../dataset/SortType';
import { toApiOrdering } from '../../../dataset/sorts';
import { info as soulmateInfo } from '../../../soulmate/endpoints';
import { getSoulmateTotal } from '../../../soulmate/reducers';
import Overview from '../../../spot/output/Overview';

type Props = {|
  +spots: Array<Object>,
  +fetching: boolean,
  +spotHistory: (string, SortType) => (void),
  +soulmateInfo: (string) => (void),
  +match: Object,
  +soulmateTotal: number,
|};
type State = {|
  sort: SortType,
|};
class Spots extends React.Component<Props, State> {
  state = {
    sort: {
      order: 'desc',
      orderBy: 'assigned_at',
    },
  };

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    const { match: { params: { id } } } = this.props;
    this.props.soulmateInfo(id);
    this.props.spotHistory(this.props.match.params.id, this.state.sort);
  };

  render() {
    const {
      spots,
      fetching,
      match: { params: { id } },
      soulmateTotal,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={SPOTS_TYPE} id={id} soulmateTotal={soulmateTotal} />
        <Overview spots={spots} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  spots: state.demand.spots.payload,
  soulmateTotal: getSoulmateTotal(state),
  fetching: state.demand.spots.fetching,
});
const mapDispatchToProps = dispatch => ({
  soulmateInfo: (id: string) => dispatch(soulmateInfo(id)),
  spotHistory: (
    id: string,
    sort: SortType,
  ) => dispatch(spotHistory(id, [toApiOrdering(sort)])),
});
export default connect(mapStateToProps, mapDispatchToProps)(Spots);
