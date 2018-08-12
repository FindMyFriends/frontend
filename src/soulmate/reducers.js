// @flow
import isEmpty from 'lodash';
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
export const soulmate = (state: stateType = initState, action: Object): stateType => {
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

export const getTotal = (
  demand: string,
  state: Object,
): number => (
  state.soulmate.info && state.soulmate.info[demand] && state.soulmate.info[demand].payload
    ? state.soulmate.info[demand].payload.total
    : 0
);

export const singleFetching = (
  demand: string,
  state: Object,
) => (
  (state.soulmate.all[demand] ? state.soulmate.all[demand].fetching : false)
    || (state.soulmate.info[demand] ? state.soulmate.info[demand].fetching : false)
);

export const fetchedDemandInfo = (demand: string, state: Object) => (
  state.soulmate.info
    && state.soulmate.info[demand]
    && !isEmpty(state.soulmate.info[demand].payload)
);

export const fetchedDemandSoulmates = (demand: string, state: Object) => (
  state.soulmate.all
    && state.soulmate.all[demand]
    && !isEmpty(state.soulmate.all[demand].payload)
);

export const getAllByDemand = (demand: string, state: Object) => (
  state.soulmate.all && state.soulmate.all[demand] ? state.soulmate.all[demand].payload : {}
);
