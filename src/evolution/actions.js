// @flow
import { fromHeader } from '../dataset/pagination';

export const EVOLUTION = 'EVOLUTION';
export const RECEIVED_ALL_EVOLUTIONS = 'RECEIVED_ALL_EVOLUTIONS';
export const RECEIVED_SINGLE_EVOLUTION = 'RECEIVED_SINGLE_EVOLUTION';
export const REQUESTED_SINGLE_EVOLUTION = 'REQUESTED_SINGLE_EVOLUTION';
export const REQUESTED_ALL_EVOLUTIONS = 'REQUESTED_ALL_EVOLUTIONS';

export const requestedAll = () => ({
  type: REQUESTED_ALL_EVOLUTIONS,
  fetching: true,
});

export const requestedSingle = (id: string) => ({
  type: REQUESTED_SINGLE_EVOLUTION,
  id,
  fetching: true,
});

export const receivedAll = (evolutions: Array<Object>, headers: Object) => ({
  type: RECEIVED_ALL_EVOLUTIONS,
  evolutions,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const receivedSingle = (id: string, evolution: Object, etag: string) => ({
  type: RECEIVED_SINGLE_EVOLUTION,
  id,
  evolution,
  etag,
  fetching: false,
});
