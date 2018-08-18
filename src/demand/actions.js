// @flow
import { fromHeader } from '../dataset/pagination';

export const DEMAND = 'DEMAND';
export const REQUESTED_DEMANDS = 'REQUESTED_DEMANDS';
export const RECEIVED_DEMANDS = 'RECEIVED_DEMANDS';
export const RECEIVED_DEMAND = 'RECEIVED_DEMAND';
export const REQUESTED_DEMAND = 'REQUESTED_DEMAND';
export const INVALIDATED_DEMANDS = 'INVALIDATED_DEMANDS';
export const INVALIDATED_DEMAND = 'INVALIDATED_DEMAND';

export const invalidatedAll = () => ({
  type: INVALIDATED_DEMANDS,
});

export const invalidatedSingle = (id: string) => ({
  type: INVALIDATED_DEMAND,
  id,
});

export const requestedSingle = (id: string) => ({
  type: REQUESTED_DEMAND,
  id,
  fetching: true,
});

export const requestedAll = () => ({
  type: REQUESTED_DEMANDS,
  fetching: true,
});

export const receivedAll = (demands: Array<Object>, headers: Object) => ({
  type: RECEIVED_DEMANDS,
  demands,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const receivedSingle = (id: string, demand: Object, etag: string) => ({
  type: RECEIVED_DEMAND,
  id,
  demand,
  etag,
  fetching: false,
});

