// @flow
import { fromHeader } from '../dataset/pagination';

export const EVOLUTION = 'EVOLUTION';
export const RECEIVED_EVOLUTIONS = 'RECEIVED_EVOLUTIONS';
export const RECEIVED_EVOLUTION = 'RECEIVED_EVOLUTION';
export const REQUESTED_EVOLUTION = 'REQUESTED_EVOLUTION';
export const REQUESTED_EVOLUTIONS = 'REQUESTED_EVOLUTIONS';

export const requestedAll = () => ({
  type: REQUESTED_EVOLUTIONS,
  fetching: true,
});

export const requestedSingle = (id: string) => ({
  type: REQUESTED_EVOLUTION,
  id,
  fetching: true,
});

export const receivedAll = (evolutions: Array<Object>, headers: Object) => ({
  type: RECEIVED_EVOLUTIONS,
  evolutions,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const receivedSingle = (id: string, evolution: Object, etag: string) => ({
  type: RECEIVED_EVOLUTION,
  id,
  evolution,
  etag,
  fetching: false,
});
