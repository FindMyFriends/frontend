// @flow
import {
  RECEIVED_SOULMATES_BY_DEMAND,
  REQUESTED_SOULMATES_BY_DEMAND,
  REQUESTED_SOULMATE_INFO_BY_DEMAND,
  RECEIVED_SOULMATE_INFO_BY_DEMAND,
} from './actions';

type stateType = {|
  +all: Object,
  +info: Object,
|};
const initState = {
  all: {},
  info: {},
};
export default (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case REQUESTED_SOULMATES_BY_DEMAND:
      return {
        ...state,
        all: {
          ...state.all,
          [action.demand]: {
            fetching: action.fetching,
          },
        },
      };
    case REQUESTED_SOULMATE_INFO_BY_DEMAND:
      return {
        ...state,
        info: {
          ...state.info,
          [action.demand]: {
            fetching: action.fetching,
          },
        },
      };
    case RECEIVED_SOULMATES_BY_DEMAND:
      return {
        ...state,
        all: {
          ...state.all,
          [action.demand]: {
            payload: action.soulmates,
            fetching: action.fetching,
          },
        },
      };
    case RECEIVED_SOULMATE_INFO_BY_DEMAND:
      return {
        ...state,
        info: {
          ...state.info,
          [action.demand]: {
            payload: {
              total: action.total,
            },
          },
          fetching: action.fetching,
        },
      };
    default:
      return state;
  }
};
