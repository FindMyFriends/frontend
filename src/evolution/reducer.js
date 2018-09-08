// @flow
import {
  RECEIVED_EVOLUTIONS,
  RECEIVED_EVOLUTION,
  REQUESTED_EVOLUTION,
  REQUESTED_EVOLUTIONS,
  INVALIDATED_EVOLUTIONS,
} from './actions';

type State = {|
  +single: Object,
  +all: Object,
  +etag: ?string,
  +total: ?number,
|};
const init = {
  all: {
    payload: {},
    fetching: true,
  },
  single: {},
  etag: null,
  total: 0,
};
export default (state: State = init, action: Object): State => {
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
    case INVALIDATED_EVOLUTIONS:
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
