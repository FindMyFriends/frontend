// @flow
import { fromHeader } from '../dataset/pagination';

export const RECEIVED_ALL_SOULMATES_BY_DEMAND = 'RECEIVED_ALL_SOULMATES_BY_DEMAND';
export const REQUESTED_ALL_SOULMATES_BY_DEMAND = 'REQUESTED_ALL_SOULMATES_BY_DEMAND';
export const REQUESTED_SOULMATE_INFO = 'REQUESTED_SOULMATE_INFO';
export const RECEIVED_SOULMATE_INFO = 'RECEIVED_SOULMATE_INFO';

export const receivedAllByDemand = (soulmates: Array<Object>, headers: Object) => ({
  type: RECEIVED_ALL_SOULMATES_BY_DEMAND,
  soulmates,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const requestedAllByDemand = () => ({
  type: REQUESTED_ALL_SOULMATES_BY_DEMAND,
  fetching: true,
});

export const requestedInfo = () => ({
  type: REQUESTED_SOULMATE_INFO,
  fetching: true,
});

export const receivedInfo = (headers: Object) => ({
  type: RECEIVED_SOULMATE_INFO,
  total: parseInt(headers['x-total-count'], 10),
  fetching: false,
});
