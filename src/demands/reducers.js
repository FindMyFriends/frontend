import {
  RECEIVED_ALL_DEMANDS,
  REQUESTED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  REQUESTED_SINGLE_DEMAND,
  RECEIVED_DEMAND_SCHEMA,
} from './actions';

export const demands = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_ALL_DEMANDS:
      return Object.assign({}, state, { all: action.demands });
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return Object.assign({}, state, { pages: action.pages });
    case REQUESTED_ALL_DEMANDS:
    default:
      return state;
  }
};

export const demand = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_SINGLE_DEMAND:
      return action.demand;
    case REQUESTED_SINGLE_DEMAND:
    default:
      return state;
  }
};

export const schema = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_DEMAND_SCHEMA:
      return Object.assign({}, state, { schema: action.schema });
    default:
      return state;
  }
};
