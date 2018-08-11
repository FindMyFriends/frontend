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
            payload: {
              address: action.address,
            },
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
  // $FlowFixMe
  Object.values(spot.places).filter((single: Object) => single.fetching).length > 0
    || isEmpty(spot.places)
);

export const fetchedPlaces = (id: string, state: Object) => !isEmpty(state.spot.places[id].payload);