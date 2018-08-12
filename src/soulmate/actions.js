// @flow
import { fromHeader } from '../dataset/pagination';

export const RECEIVED_ALL_SOULMATES_BY_DEMAND = 'RECEIVED_ALL_SOULMATES_BY_DEMAND';
export const REQUESTED_ALL_SOULMATES_BY_DEMAND = 'REQUESTED_ALL_SOULMATES_BY_DEMAND';
export const REQUESTED_SOULMATE_INFO_BY_DEMAND = 'REQUESTED_SOULMATE_INFO_BY_DEMAND';
export const RECEIVED_SOULMATE_INFO_BY_DEMAND = 'RECEIVED_SOULMATE_INFO_BY_DEMAND';

export const receivedAllByDemand = (demand: string, soulmates: Array<Object>, headers: Object) => ({
  type: RECEIVED_ALL_SOULMATES_BY_DEMAND,
  soulmates,
  demand,
  total: parseInt(headers['x-total-count'], 10),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const requestedAllByDemand = (demand: string) => ({
  type: REQUESTED_ALL_SOULMATES_BY_DEMAND,
  demand,
  fetching: true,
});

export const requestedInfoByDemand = (demand: string) => ({
  type: REQUESTED_SOULMATE_INFO_BY_DEMAND,
  demand,
  fetching: true,
});

export const receivedInfoByDemand = (demand: string, headers: Object) => ({
  type: RECEIVED_SOULMATE_INFO_BY_DEMAND,
  demand,
  total: parseInt(headers['x-total-count'], 10),
  fetching: false,
});
