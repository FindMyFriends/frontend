// @flow
import {
  RECEIVED_PLACE,
  REQUESTED_PLACE,
  RECEIVED_SPOTS,
  REQUESTED_SPOTS,
  INVALIDATE_SPOTS_BY_DEMAND,
} from './actions';
import { getSpotsWithoutDemand } from './selects';

type State = {|
  +places: Object,
  +all: Object,
|};
const init = {
  places: {},
  all: {
    payload: {},
    fetching: true,
  },
};
export default (state: State = init, action: Object): State => {
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
