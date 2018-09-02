// @flow
import { fromHeader } from '../dataset/pagination';
import * as response from '../api/response';

export const RECEIVED_SOULMATES_BY_DEMAND = 'RECEIVED_SOULMATES_BY_DEMAND';
export const REQUESTED_SOULMATES_BY_DEMAND = 'REQUESTED_SOULMATES_BY_DEMAND';
export const REQUESTED_SOULMATE_INFO_BY_DEMAND = 'REQUESTED_SOULMATE_INFO_BY_DEMAND';
export const RECEIVED_SOULMATE_INFO_BY_DEMAND = 'RECEIVED_SOULMATE_INFO_BY_DEMAND';

export const receivedAllByDemand = (demand: string, soulmates: Array<Object>, headers: Object) => ({
  type: RECEIVED_SOULMATES_BY_DEMAND,
  soulmates,
  demand,
  total: response.extractedTotalCount(headers),
  pagination: fromHeader(headers.link),
  fetching: false,
});

export const requestedAllByDemand = (demand: string) => ({
  type: REQUESTED_SOULMATES_BY_DEMAND,
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
  total: response.extractedTotalCount(headers),
  fetching: false,
});
