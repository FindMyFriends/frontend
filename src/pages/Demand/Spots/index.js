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
import { places as spotPlaces } from '../../../spot/endpoints';
import { isPlacesFetching, isSpotsFetching, spotsByDemand } from '../../../spot/reducers';

type Props = {|
  +spotsByDemand: (string) => Array<Object>,
  +spotPlaces: (Array<Object>) => (void),
  +fetching: (Array<string>) => boolean,
  +spotHistory: (string, SortType, () => (void)) => (void),
  +soulmateInfo: (string) => (void),
  +places: Array<Object>,
  +match: Object,
  +getSoulmateTotal: (string) => number,
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
    this.props.spotHistory(
      this.props.match.params.id,
      this.state.sort,
      () => this.props.spotPlaces(this.props.spotsByDemand(id)),
    );
  };

  render() {
    const {
      spotsByDemand,
      fetching,
      match: { params: { id } },
      getSoulmateTotal,
      places,
    } = this.props;
    const spots = spotsByDemand(id);
    if (fetching(Object.values(spots).map(spot => spot.id))) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={SPOTS_TYPE} id={id} soulmateTotal={getSoulmateTotal(id)} />
        <Overview spots={spots} places={places} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  spotsByDemand: (demand: string) => spotsByDemand(state.spot, demand),
  places: state.spot.places,
  getSoulmateTotal: (demand: string) => getSoulmateTotal(demand, state),
  fetching: (spots: Array<string>) => (
    isSpotsFetching(state.spot) || isPlacesFetching(state.spot, spots)
  ),
});
const mapDispatchToProps = dispatch => ({
  soulmateInfo: (id: string) => dispatch(soulmateInfo(id)),
  spotPlaces: (spots: Array<Object>) => dispatch(spotPlaces(spots)),
  spotHistory: (
    id: string,
    sort: SortType,
    next: () => (void),
  ) => dispatch(spotHistory(id, [toApiOrdering(sort)], next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Spots);
