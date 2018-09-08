// @flow
import React from 'react';
import { connect } from 'react-redux';
import { history as spotHistory } from '../../../demand/spot/endpoints';
import Loader from '../../../ui/Loader';
import { default as Tabs, SPOTS_TYPE } from '../menu/Tabs';
import type { SortType } from '../../../dataset/SortType';
import { toApiOrdering } from '../../../dataset/formats';
import { info as soulmateInfo } from '../../../soulmate/endpoints';
import { getTotal } from '../../../soulmate/selects';
import Overview from '../../../spot/output/Overview';
import { places as spotPlaces } from '../../../spot/endpoints';
import { getPlaces, placesFetching, spotsFetching, getSpotsByDemand } from '../../../spot/selects';

type Props = {|
  +spots: Array<Object>,
  +spotPlaces: (Array<Object>) => (void),
  +fetching: boolean,
  +spotHistory: (string, SortType, () => (void)) => (void),
  +soulmateInfo: (string) => (void),
  +places: Array<Object>,
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

  componentDidMount = () => this.reload();

  reload = () => {
    const { match: { params: { id } } } = this.props;
    this.props.soulmateInfo(id);
    this.props.spotHistory(
      this.props.match.params.id,
      this.state.sort,
      () => this.props.spotPlaces(this.props.spots),
    );
  };

  render() {
    const {
      spots,
      fetching,
      match: { params: { id } },
      soulmateTotal,
      places,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={SPOTS_TYPE} id={id} soulmateTotal={soulmateTotal} />
        <Overview spots={spots} places={places} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => {
  const spots = getSpotsByDemand(state, id);
  return {
    spots,
    places: getPlaces(state),
    soulmateTotal: getTotal(id, state),
    fetching: spotsFetching(state)
      || placesFetching(state, spots.map(spot => spot.id)),
  };
};
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
