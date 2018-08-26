// @flow
import { isEmpty } from 'lodash';
import { getPrettyDescription } from '../description/selects';

export const getTimelineSides = (options: Object): Array<string> => (
  !isEmpty(options) ? options.spot.met_at.timeline_side : []
);

export const getPrettyDemand = (demand: ?Object, options: ?Object): Object => {
  if (demand && options) {
    return getPrettyDescription(demand, options);
  }
  return { };
};

export const fetchedAll = (state: Object): boolean => !isEmpty(state.demand.all.payload);

export const fetchedSingle = (id: string, state: Object): boolean => (
  state.demand.single[id] ? !isEmpty(state.demand.single[id].payload) : false
);

export const getById = (id: string, state: Object): Object => (
  state.demand.single[id] ? state.demand.single[id].payload : {}
);

export const getETag = (id: string, state: Object): ?string => (
  state.demand.single[id] ? state.demand.single[id].etag : null
);

export const singleFetching = (id: string, state: Object): boolean => (
  state.demand.single[id] ? state.demand.single[id].fetching : true
);

export const allFetching = (state: Object): boolean => state.demand.all.fetching;

export const getTotal = (state: Object): number => state.demand.total;
