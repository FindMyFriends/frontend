// @flow
import { isEmpty, pickBy } from 'lodash';
import {
  RECEIVED_PLACE,
  REQUESTED_PLACE,
  RECEIVED_SPOTS,
  REQUESTED_SPOTS,
  INVALIDATE_SPOTS_BY_DEMAND,
} from './actions';

export const getSpotsWithoutDemand = (spots: Object, demand: string) => (
  pickBy(spots, spot => spot.demand_id !== demand)
);

type stateType = {|
  +places: Object,
  +all: Object,
|};
const initState = {
  places: {},
  all: {
    payload: {},
    fetching: true,
  },
};
export const spot = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case REQUESTED_PLACE:
      return {
        ...state,
        places: {
          ...state.places,
          [action.id]: {
            payload: {},
            fetching: action.fetching,
          },
        },
      };
    case RECEIVED_PLACE:
      return {
        ...state,
        places: {
          ...state.places,
          [action.id]: {
            payload: {
              spotId: action.id,
              address: action.address,
            },
            failed: action.failed,
            fetching: action.fetching,
          },
        },
      };
    case REQUESTED_SPOTS:
      return {
        ...state,
        all: {
          payload: {},
          fetching: action.fetching,
        },
      };
    case RECEIVED_SPOTS:
      return {
        ...state,
        all: {
          payload: {
            ...state.all.payload,
            ...action.spots,
          },
          fetching: action.fetching,
        },
      };
    case INVALIDATE_SPOTS_BY_DEMAND:
      return {
        ...state,
        all: {
          payload: getSpotsWithoutDemand(state.all.payload, action.demand),
        },
      };
    default:
      return state;
  }
};

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
