// @flow
import { isEmpty, pickBy } from 'lodash';

export const getSpotsWithoutDemand = (spots: Object, demand: string) => (
  pickBy(spots, spot => spot.demand_id !== demand)
);

export const getSpotsByDemand = (state: Object, demand: string): Object => (
  // $FlowFixMe
  Object.values(state.spot.all.payload).filter(spot => spot.demand_id === demand)
);

export const getSpotsByEvolution = (state: Object, evolution: string): Object => (
  // $FlowFixMe
  Object.values(state.spot.all.payload).filter(spot => spot.evolution_id === evolution)
);

export const spotsFetching = (state: Object) => state.spot.all.fetching;

export const placesFetching = (state: Object, spots: Array<string>): boolean => {
  if (isEmpty(state.spot.places)) {
    return true;
  }
  // $FlowFixMe
  const own = Object.values(state.spot.places)
    .filter((spot: Object) => spots.includes(spot.payload.spotId));
  return own.length === 0 || own.filter((spot: Object) => spot.fetching).length > 0;
};

export const fetchedPlaces = (id: string, state: Object): boolean => {
  return !isEmpty(state.spot.places[id]) && !isEmpty(state.spot.places[id].payload);
};

export const fetchedDemandSpots = (demand: string, state: Object): boolean => (
  // $FlowFixMe
  Object.values(state.spot.all.payload).filter(spot => spot.demand_id === demand).length > 0
);

export const fetchedEvolutionSpots = (evolution: string, state: Object): boolean => (
  // $FlowFixMe
  Object.values(state.spot.all.payload).filter(spot => spot.evolution_id === evolution).length > 0
);

export const getPlaces = (state: Object): Object => state.spot.places;
