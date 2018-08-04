// @flow
import { getPrettyDescription } from '../description/selects';
import {
  REQUESTED_DEMAND,
  RECEIVED_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND, REQUESTED_DEMAND_LOCATIONS, RECEIVED_ALL_DEMAND_LOCATIONS,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';

type stateType = {|
  +single: Object,
  +locations: Object,
  +all: Object,
  +etag: ?string,
  +pagination: ?PaginationType,
  +total: ?number,
|};
const initState = {
  single: {
    payload: {},
    fetching: true,
  },
  all: {
    payload: {},
    fetching: true,
  },
  locations: {
    payload: {},
    fetching: true,
  },
  etag: null,
  pagination: null,
  total: null,
};
export const demand = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return {
        ...state,
        single: {
          payload: action.demand,
          fetching: action.fetching,
        },
        etag: action.etag,
      };
    case RECEIVED_ALL_DEMANDS:
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
          fetching: action.fetching,
        },
        all: {
          ...state.all,
          fetching: action.fetching,
        },
      };
    case REQUESTED_DEMAND_LOCATIONS:
      return {
        ...state,
        locations: {
          ...state.locations,
          fetching: action.fetching,
        },
      };
    case RECEIVED_ALL_DEMAND_LOCATIONS:
      return {
        ...state,
        locations: {
          payload: action.locations,
          fetching: action.fetching,
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
