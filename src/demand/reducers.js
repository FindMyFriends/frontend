// @flow
import * as R from 'ramda';
import { getPrettyDescription } from './../description/selects';
import {
  RECEIVED_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
  RECEIVED_DEMAND_OPTIONS,
  RECEIVED_DEMAND_SCHEMA,
} from './actions';

type stateType = {|
  +single: ?Object,
  +etag: ?string,
  +all: ?Array<Object>,
  +total: ?number,
  +options: ?any, // TODO: Move
  +schema: ?any, // TODO: Move
  +fetching: boolean,
|};
const initState = {
  single: null,
  etag: null,
  all: null,
  total: null,
  options: null,
  schema: null,
  fetching: true,
};
export const demand = (state: stateType = initState, action: Object) => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return {
        ...state,
        single: action.demand,
        etag: action.etag,
        fetching: false,
      };
    case RECEIVED_ALL_DEMANDS:
      return {
        ...state,
        all: action.demands,
        pagination: action.pagination,
        total: action.total,
        fetching: false,
      };
    case RECEIVED_DEMAND_OPTIONS:
      return { ...state, options: action.options };
    case RECEIVED_DEMAND_SCHEMA:
      return { ...state, schema: action.schema };
    default:
      return state;
  }
};

export const getTimelineSides = (options: any) => (options ? options.location.met_at.timeline_side : []);

export const getPrettyDemand = (demand: Object, options: any) => {
  if (R.isEmpty(demand) || R.isEmpty(options)) {
    return { };
  }
  return getPrettyDescription(demand, options);
};

export const getDemandNotes = (state: Object) => {
  if (state.demand.all) {
    return state.demand.all.reduce((demandNotes, demand) => ({
      ...demandNotes,
      [demand.id]: demand.note,
    }), { });
  }
  return { };
};