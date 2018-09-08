// @flow
import {
  REQUESTED_DEMAND,
  REQUESTED_DEMANDS,
  RECEIVED_DEMANDS,
  RECEIVED_DEMAND,
  INVALIDATED_DEMANDS,
  INVALIDATED_DEMAND,
} from './actions';

type State = {|
  +single: Object,
  +all: Object,
  +total: number,
|};
const init = {
  single: {},
  all: {
    payload: [],
    fetching: true,
  },
  total: 0,
};
export default (state: State = init, action: Object): State => {
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
