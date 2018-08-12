// @flow
import { fromHeader } from '../dataset/pagination';

export const DEMAND = 'DEMAND';
export const REQUESTED_ALL_DEMANDS = 'REQUESTED_ALL_DEMANDS';
export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const RECEIVED_SINGLE_DEMAND = 'RECEIVED_SINGLE_DEMAND';
export const REQUESTED_SINGLE_DEMAND = 'REQUESTED_SINGLE_DEMAND';

export const requestedDemand = (id: string) => ({
  type: REQUESTED_SINGLE_DEMAND,
  id,
  fetching: true,
});

export const requestedAllDemands = () => ({
  type: REQUESTED_ALL_DEMANDS,
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

