import {
  RECEIVED_ALL_DEMAND_SOULMATES,
  RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES,
} from './actions';

export const soulmate = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_ALL_DEMAND_SOULMATES:
      return { ...state, all: action.soulmates };
    case RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES:
      return { ...state, pages: action.pages };
    default:
      return state;
  }
};
