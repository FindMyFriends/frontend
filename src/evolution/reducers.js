// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_ALL_EVOLUTIONS,
  REQUESTED_EVOLUTION,
  RECEIVED_SINGLE_EVOLUTION,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';
import { getPrettyDescription } from '../description/selects';

type stateType = {|
  +single: Object,
  +all: Object,
  +etag: ?string,
  +pagination: ?PaginationType,
  +total: ?number,
|};
const initState = {
  all: {
    payload: {},
    fetching: true,
  },
  single: {
    payload: {},
    fetching: true,
  },
  etag: null,
  pagination: null,
  total: null,
};
export const evolution = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_SINGLE_EVOLUTION:
      return {
        ...state,
        single: {
          payload: action.evolution,
          fetching: action.fetching,
        },
        etag: action.etag,
      };
    case RECEIVED_ALL_EVOLUTIONS:
      return {
        ...state,
        all: {
          payload: action.evolutions,
          fetching: action.fetching,
        },
        pagination: action.pagination,
        total: action.total,
      };
    case REQUESTED_EVOLUTION:
      return {
        ...state,
        single: {
          ...state.single,
          fetching: action.fetching,
        },
        all: {
          ...state.all,
          fetching: action.fetching,
        },
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

export const fetchedAll = (state: Object) => !isEmpty(state.evolution.all.payload);
