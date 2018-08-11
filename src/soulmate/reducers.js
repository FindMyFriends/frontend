// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_ALL_SOULMATES_BY_DEMAND,
  REQUESTED_ALL_SOULMATES_BY_DEMAND,
  REQUESTED_SOULMATE_INFO,
  RECEIVED_SOULMATE_INFO,
} from './actions';

type stateType = {|
  +all: ?Array<Object>,
  +info: ?Object,
  +total: ?number,
  +fetching: boolean,
|};
const initState = {
  all: null,
  info: null,
  total: null,
  fetching: true,
};
export const soulmate = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_ALL_SOULMATES_BY_DEMAND:
      return {
        ...state,
        all: action.soulmates,
        total: action.total,
        fetching: action.fetching,
      };
    case REQUESTED_ALL_SOULMATES_BY_DEMAND:
    case REQUESTED_SOULMATE_INFO:
      return {
        ...state,
        fetching: action.fetching,
      };
    case RECEIVED_SOULMATE_INFO:
      return {
        ...state,
        info: {
          total: action.total,
        },
        fetching: action.fetching,
      };
    default:
      return state;
  }
};

export const getSoulmateTotal = (state: Object): number => {
  if (state.soulmate.info === null) {
    return 0;
  }
  return state.soulmate.info.total;
};

export const fetchedAll = (state: Object) => !isEmpty(state.soulmate.all);

export const fetchedDemandInfo = (demand: string, state: Object) => ;
