// @flow
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
