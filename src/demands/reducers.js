import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_SCHEMA,
  RECEIVED_DEMAND_PROPERTY,
} from './actions';

export const demands = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_ALL_DEMANDS:
      return Object.assign({}, state, { all: action.demands });
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return Object.assign({}, state, { pages: action.pages });
    default:
      return state;
  }
};

export const demand = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_SINGLE_DEMAND:
      return action.demand;
    default:
      return state;
  }
};

export const schema = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_DEMAND_SCHEMA:
      return Object.assign({}, state, { schema: action.schema });
    case RECEIVED_DEMAND_PROPERTY:
      return Object.assign({}, state, { [action.property]: action.value });
    default:
      return state;
  }
};
