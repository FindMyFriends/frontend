// @flow
import { fromHeader } from '../dataset/pagination';

export const DEMAND = 'DEMAND';
export const REQUESTED_DEMAND = 'REQUESTED_DEMAND';
export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const RECEIVED_SINGLE_DEMAND = 'RECEIVED_SINGLE_DEMAND';
export const REQUESTED_DEMAND_LOCATIONS = 'REQUESTED_DEMAND_LOCATIONS';
export const RECEIVED_ALL_DEMAND_LOCATIONS = 'RECEIVED_ALL_DEMAND_LOCATIONS';

export const requestedDemand = () => ({
  type: REQUESTED_DEMAND,
  fetching: true,
});

export const requestedLocations = () => ({
  type: REQUESTED_DEMAND_LOCATIONS,
  fetching: true,
});

export const receivedAll = (demands: Array<Object>, headers: Object) => ({
  type: RECEIVED_ALL_DEMANDS,
  demands,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const receivedSingle = (id: string, demand: Object, etag: string) => ({
  type: RECEIVED_SINGLE_DEMAND,
  id,
  demand,
  etag,
  fetching: false,
});

export const receivedLocations = (locations: Array<Object>) => ({
  type: RECEIVED_ALL_DEMAND_LOCATIONS,
  locations,
  fetching: false,
});
