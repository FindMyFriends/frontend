import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_SCHEMA,
  RECEIVED_DEMAND_PROPERTY,
} from './actions';

export const demands = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_ALL_DEMANDS:
      return { ...state, all: action.demands };
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return { ...state, pages: action.pages };
    default:
      return state;
  }
};

export const demand = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return action.demand;
    default:
      return state;
  }
};

export const schema = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_DEMAND_SCHEMA:
      return { ...state, schema: action.schema };
    case RECEIVED_DEMAND_PROPERTY:
      return { ...state, [action.property]: action.value };
    default:
      return state;
  }
};
