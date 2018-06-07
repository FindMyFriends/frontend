// @flow
import { getPrettyDescription } from '../description/selects';
import {
  REQUESTED_DEMAND,
  RECEIVED_ALL_DEMANDS,
  RECEIVED_SINGLE_DEMAND,
} from './actions';

type stateType = {|
  +single: ?Object,
  +etag: ?string,
  +all: ?Array<Object>,
  +total: ?number,
  +fetching: boolean,
|};
const initState = {
  single: null,
  etag: null,
  all: null,
  total: null,
  fetching: true,
};
export const demand = (state: stateType = initState, action: Object): stateType => {
  switch (action.type) {
    case RECEIVED_SINGLE_DEMAND:
      return {
        ...state,
        single: action.demand,
        etag: action.etag,
        fetching: action.fetching,
      };
    case RECEIVED_ALL_DEMANDS:
      return {
        ...state,
        all: action.demands,
        pagination: action.pagination,
        total: action.total,
        fetching: action.fetching,
      };
    case REQUESTED_DEMAND:
      return {
        ...state,
        fetching: action.fetching,
      };
    default:
      return state;
  }
};

export const getTimelineSides = (options: any) => (
  options ? options.location.met_at.timeline_side : []
);

export const getPrettyDemand = (demand: ?Object, options: ?mixed): Object => {
  if (demand && options) {
    return getPrettyDescription(demand, options);
  }
  return { };
};
