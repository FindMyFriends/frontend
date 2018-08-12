// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_EVOLUTIONS,
  RECEIVED_EVOLUTION,
  REQUESTED_EVOLUTION,
  REQUESTED_EVOLUTIONS,
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
  single: {},
  etag: null,
  pagination: null,
  total: 0,
};
export const evolution = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_EVOLUTION:
      return {
        ...state,
        single: {
          [action.id]: {
            payload: action.evolution,
            fetching: action.fetching,
          },
        },
        etag: action.etag,
      };
    case RECEIVED_EVOLUTIONS:
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
          [action.id]: {
            fetching: action.fetching,
            payload: {},
          },
        },
      };
    case REQUESTED_EVOLUTIONS:
      return {
        ...state,
        all: {
          fetching: true,
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

export const fetchedAll = (state: Object): boolean => !isEmpty(state.evolution.all.payload);

export const fetchedSingle = (id: string, state: Object) => (
  state.evolution.single[id] ? !isEmpty(state.evolution.single[id].payload) : false
);

export const getById = (id: string, state: Object): Object => (
  state.evolution.single[id] ? state.evolution.single[id].payload : {}
);

export const singleFetching = (id: string, state: Object): boolean => (
  state.evolution.single[id] ? state.evolution.single[id].fetching : true
);

export const allFetching = (state: Object): boolean => state.evolution.all.fetching;

export const getTotal = (state: Object): number => state.evolution.total;
