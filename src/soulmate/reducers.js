// @flow
import {
  RECEIVED_ALL_DEMAND_SOULMATES,
  RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES,
  RECEIVED_SOULMATE_REQUESTS,
  RECEIVED_SOULMATE_REFRESH,
  RECEIVED_SOULMATE_CLARIFY,
  RECEIVED_SOULMATE_INFO,
} from './actions';

export const soulmate = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case RECEIVED_ALL_DEMAND_SOULMATES:
      return { ...state, all: action.soulmates, info: action.info };
    case RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES:
      return { ...state, pages: action.pages };
    case RECEIVED_SOULMATE_REQUESTS:
      return {
        ...state,
        requests: action.requests.map(request => ({
          ...request,
          is_seeking: request.status === 'pending' || request.status === 'processing',
        })),
      };
    case RECEIVED_SOULMATE_REFRESH:
      return { ...state, refreshAt: action.refreshAt, demand: action.demand };
    case RECEIVED_SOULMATE_CLARIFY:
      return { ...state, soulmate: action.soulmate };
    case RECEIVED_SOULMATE_INFO:
      return { ...state, info: action.info };
    default:
      return state;
  }
};
