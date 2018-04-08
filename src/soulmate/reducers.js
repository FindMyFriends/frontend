import {
  RECEIVED_ALL_DEMAND_SOULMATES,
  RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES,
  RECEIVED_SOULMATE_REQUESTS,
  RECEIVED_SOULMATE_REFRESH,
} from './actions';

export const soulmate = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_ALL_DEMAND_SOULMATES:
      return { ...state, all: action.soulmates };
    case RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES:
      return { ...state, pages: action.pages };
    case RECEIVED_SOULMATE_REQUESTS:
      return { ...state, requests: action.requests };
    case RECEIVED_SOULMATE_REFRESH:
      return { ...state, refreshAt: action.refreshAt, demand: action.demand };
    default:
      return state;
  }
};
