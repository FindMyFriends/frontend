// @flow
import { isEmpty } from 'lodash';
import { getPrettyDescription } from '../description/selects';
import {
  REQUESTED_DEMAND,
  REQUESTED_DEMANDS,
  RECEIVED_DEMANDS,
  RECEIVED_DEMAND,
  INVALIDATED_DEMANDS,
  INVALIDATED_DEMAND,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';

type stateType = {|
  +single: Object,
  +all: Object,
  +pagination: ?PaginationType,
  +total: number,
|};
const initState = {
  single: {},
  all: {
    payload: [],
    fetching: true,
  },
  pagination: null,
  total: 0,
};
export const demand = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_DEMAND:
      return {
        ...state,
        single: {
          ...state.single,
          [action.id]: {
            payload: action.demand,
            fetching: action.fetching,
            etag: action.etag,
          },
        },
      };
    case RECEIVED_DEMANDS:
      return {
        ...state,
        all: {
          payload: action.demands,
          fetching: action.fetching,
        },
        pagination: action.pagination,
        total: action.total,
      };
    case REQUESTED_DEMAND:
      return {
        ...state,
        single: {
          ...state.single,
          [action.id]: {
            payload: {},
            fetching: action.fetching,
          },
        },
      };
    case REQUESTED_DEMANDS:
      return {
        ...state,
        all: {
          fetching: action.fetching,
        },
      };
    case INVALIDATED_DEMANDS:
      return {
        ...state,
        all: {
          fetching: true,
        },
      };
    case INVALIDATED_DEMAND:
      return {
        ...state,
        single: {
          [action.id]: {
            payload: {},
            fetching: true,
          },
        },
      };
    default:
      return state;
  }
};

export const getPrettyDemand = (demand: ?Object, options: ?Object): Object => {
  if (demand && options) {
    return getPrettyDescription(demand, options);
  }
  return { };
};

export const fetchedAll = (state: Object): boolean => !isEmpty(state.demand.all.payload);

export const fetchedSingle = (id: string, state: Object): boolean => (
  state.demand.single[id] ? !isEmpty(state.demand.single[id].payload) : false
);

export const getById = (id: string, state: Object): Object => (
  state.demand.single[id] ? state.demand.single[id].payload : {}
);

export const getETag = (id: string, state: Object): ?string => (
  state.demand.single[id] ? state.demand.single[id].etag : null
);

export const singleFetching = (id: string, state: Object): boolean => (
  state.demand.single[id] ? state.demand.single[id].fetching : true
);

export const allFetching = (state: Object): boolean => state.demand.all.fetching;

export const getTotal = (state: Object): number => state.demand.total;
