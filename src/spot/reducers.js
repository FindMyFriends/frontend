// @flow

import { isEmpty } from 'lodash';
import { RECEIVED_PLACE, REQUESTED_PLACE } from './actions';

type stateType = {|
  +places: Object,
|};
const initState = {
  places: {},
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
            address: action.address,
            failed: action.failed,
            fetching: action.fetching,
          },
        },
      };
    default:
      return state;
  }
};

export const isFetching = (spot: Object) => (
  isEmpty(spot.places)
    || Object.values(spot.places).filter(single => single.fetching).length > 0
);
