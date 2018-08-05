// @flow
import { getPrettyDescription } from '../description/selects';
import {
  REQUESTED_DEMAND,
  RECEIVED_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND, REQUESTED_DEMAND_SPOTS, RECEIVED_ALL_DEMAND_SPOTS,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';

type stateType = {|
  +single: Object,
  +spots: Object,
  +all: Object,
  +etag: ?string,
  +pagination: ?PaginationType,
  +total: ?number,
|};
const initState = {
  single: {
    payload: {},
    fetching: true,
    etag: null,
  },
  all: {
    payload: {},
    fetching: true,
  },
  spots: {
    payload: {},
    fetching: true,
  },
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
          etag: action.etag,
        },
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
    case REQUESTED_DEMAND_SPOTS:
      return {
        ...state,
        spots: {
          ...state.spots,
          fetching: action.fetching,
        },
      };
    case RECEIVED_ALL_DEMAND_SPOTS:
      return {
        ...state,
        spots: {
          payload: action.spots,
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
