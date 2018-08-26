// @flow
import React from 'react';
import { connect } from 'react-redux';
import { history as spotHistory } from '../../../evolution/spot/endpoints';
import Loader from '../../../ui/Loader';
import { default as Tabs, SPOTS_TYPE } from '../menu/Tabs';
import type { SortType } from '../../../dataset/SortType';
import { toApiOrdering } from '../../../dataset/sorts';
import Overview from '../../../spot/output/Overview';
import { places as spotPlaces } from '../../../spot/endpoints';
import { getPlaces, placesFetching, spotsFetching, getSpotsByEvolution } from '../../../spot/selects';

type Props = {|
  +spots: Array<Object>,
  +spotPlaces: (Array<Object>) => (void),
  +fetching: boolean,
  +spotHistory: (string, SortType, () => (void)) => (void),
  +places: Array<Object>,
  +match: Object,
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
      places,
    } = this.props;
    if (fetching) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <Tabs type={SPOTS_TYPE} id={id} />
        <Overview spots={spots} places={places} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => {
  const spots = getSpotsByEvolution(state, id);
  return {
    spots,
    places: getPlaces(state),
    fetching: spotsFetching(state)
      || placesFetching(state, spots.map(spot => spot.id)),
  };
};
const mapDispatchToProps = dispatch => ({
  spotPlaces: (spots: Array<Object>) => dispatch(spotPlaces(spots)),
  spotHistory: (
    id: string,
    sort: SortType,
    next: () => (void),
  ) => dispatch(spotHistory(id, [toApiOrdering(sort)], next)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Spots);
