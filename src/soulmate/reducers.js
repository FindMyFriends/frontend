// @flow
import { isEmpty } from 'lodash';
import {
  RECEIVED_ALL_SOULMATES_BY_DEMAND,
  REQUESTED_ALL_SOULMATES_BY_DEMAND,
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
export const soulmate = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case REQUESTED_ALL_SOULMATES_BY_DEMAND:
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
    case RECEIVED_ALL_SOULMATES_BY_DEMAND:
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

export const getSoulmateTotal = (
  demand: string,
  state: Object,
): number => {
  if (state.soulmate.info && state.soulmate.info[demand] && state.soulmate.info[demand].payload) {
    return state.soulmate.info[demand].payload.total;
  }
  return 0;
};

export const isFetching = (
  demand: string,
  state: Object,
) => (
  (state.soulmate.all[demand] ? state.soulmate.all[demand].fetching : false)
    || (state.soulmate.info[demand] ? state.soulmate.info[demand].fetching : false)
);

export const fetchedDemandInfo = (demand: string, state: Object) => (
  state.soulmate.info
    && state.soulmate.info[demand]
    && state.soulmate.info[demand].payload
);

export const fetchedDemandSoulmates = (demand: string, state: Object) => (
  state.soulmate.all
  && state.soulmate.all[demand]
  && state.soulmate.all[demand].payload
);
