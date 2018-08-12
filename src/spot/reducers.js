// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_PLACE,
  REQUESTED_PLACE,
  RECEIVED_SPOTS,
  REQUESTED_SPOTS,
} from './actions';

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
            ...state.places[action.id],
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
            ...state.places[action.id],
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
    default:
      return state;
  }
};

export const spotsByDemand = (spot: Object, demand: string) => (
  Object.values(spot.all.payload).filter(spot => spot.demand_id === demand)
);

export const isSpotsFetching = (spot: Object) => spot.all.fetching;

export const isPlacesFetching = (spot: Object, spots: Array<string>) => {
  if (isEmpty(spot.places)) {
    return true;
  }
  const own = Object.values(spot.places)
    .filter((single: Object) => spots.includes(single.payload.spotId));
  return own.length === 0 || own.filter((single: Object) => single.fetching).length > 0;
};

export const fetchedPlaces = (id: string, state: Object) => {
  return !isEmpty(state.spot.places[id]) && !isEmpty(state.spot.places[id].payload);
};

export const fetchedDemandSpots = (demand: string, state: Object) => (
  Object.values(state.spot.all.payload).filter(spot => spot.demand_id === demand).length > 0
);
