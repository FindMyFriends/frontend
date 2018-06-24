// @flow
import {
  RECEIVED_ALL_EVOLUTIONS,
  REQUESTED_EVOLUTION,
  RECEIVED_SINGLE_EVOLUTION,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';
import { getPrettyDescription } from '../description/selects';

type stateType = {|
  +all: ?Array<Object>,
  +etag: ?string,
  +pagination: ?PaginationType,
  +total: ?number,
  +fetching: boolean,
|};
const initState = {
  all: null,
  etag: null,
  pagination: null,
  total: null,
  fetching: true,
};
export const evolution = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_SINGLE_EVOLUTION:
      return {
        ...state,
        single: action.evolution,
        etag: action.etag,
        fetching: action.fetching,
      };
    case RECEIVED_ALL_EVOLUTIONS:
      return {
        ...state,
        all: action.evolutions,
        pagination: action.pagination,
        total: action.total,
        fetching: action.fetching,
      };
    case REQUESTED_EVOLUTION:
      return {
        ...state,
        fetching: action.fetching,
      };
    default:
      return state;
  }
};

export const getPrettyEvolution = (evolution: ?Object, options: ?Object): Object => {
  if (evolution && options) {
    return getPrettyDescription(evolution, options);
  }
  return { };
};
