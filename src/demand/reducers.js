import * as R from 'ramda';
import { getPrettyDescription } from './../description/selects';
import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_OPTIONS,
  RECEIVED_DEMAND_SCHEMA,
} from './actions';

export const demand = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return { ...state, single: action.demand, etag: action.etag };
    case RECEIVED_ALL_DEMANDS:
      return { ...state, all: action.demands };
    case RECEIVED_PAGINATION_FOR_ALL_DEMANDS:
      return { ...state, pages: action.pages };
    case RECEIVED_DEMAND_OPTIONS:
      return { ...state, options: action.options };
    case RECEIVED_DEMAND_SCHEMA:
      return { ...state, schema: action.schema };
    default:
      return state;
  }
};

export const getTimelineSides = options => (options ? options.location.met_at.timeline_side : []);

export const getPrettyDemand = (demand, options) => {
  if (R.isEmpty(demand) || R.isEmpty(options)) {
    return { };
  }
  return getPrettyDescription(demand, options);
};

export const getDemandNotes = (state) => {
  if (state.demand.all) {
    return state.demand.all.reduce((demandNotes, demand) => ({
      ...demandNotes,
      [demand.id]: demand.note,
    }), { });
  }
  return { };
};
