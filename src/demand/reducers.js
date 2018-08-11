// @flow
import { isEmpty } from 'lodash';
import { getPrettyDescription } from '../description/selects';
import {
  REQUESTED_DEMAND,
  RECEIVED_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
} from './actions';
import type { PaginationType } from '../dataset/PaginationType';

type stateType = {|
  +single: Object,
  +all: Object,
  +pagination: ?PaginationType,
  +total: number,
|};
const initState = {
  single: {
    payload: {},
    fetching: true,
    etag: null,
  },
  all: {
    payload: [],
    fetching: true,
  },
  pagination: null,
  total: 0,
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

export const fetchedAll = (state: Object) => !isEmpty(state.demand.all.payload);
