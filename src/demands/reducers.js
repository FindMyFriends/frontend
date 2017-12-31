import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_SCHEMA_PROPERTY,
} from './actions';

export const demand = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return { ...state, single: action.demand, etag: action.etag };
    case RECEIVED_ALL_DEMANDS:
      return { ...state, all: action.demands };
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return { ...state, pages: action.pages };
    default:
      return state;
  }
};

export const schema = (state = { fetching: false }, action) => {
  switch (action.type) {
    case RECEIVED_DEMAND_SCHEMA_PROPERTY:
      return { ...state, [action.property]: action.value };
    default:
      return state;
  }
};
