import parse from 'parse-link-header';
import moment from 'moment';

export const RECEIVED_ALL_DEMAND_SOULMATES = 'RECEIVED_ALL_DEMAND_SOULMATES';
export const RECEIVED_SOULMATE_REQUESTS = 'RECEIVED_SOULMATE_REQUESTS';
export const RECEIVED_SOULMATE_REFRESH = 'RECEIVED_SOULMATE_REFRESH';
export const RECEIVED_SOULMATE_CLARIFY = 'RECEIVED_SOULMATE_CLARIFY';
export const RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES = 'RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES';
export const RECEIVED_SOULMATE_INFO = 'RECEIVED_SOULMATE_INFO';

export const receivedAllByDemand = (soulmates, demand, headers) => ({
  type: RECEIVED_ALL_DEMAND_SOULMATES,
  soulmates,
  demand,
  info: {
    total: parseInt(headers['x-total-count'], 10),
  },
});

export const receivedInfo = headers => ({
  type: RECEIVED_SOULMATE_INFO,
  info: {
    total: parseInt(headers['x-total-count'], 10),
  },
});

export const receivedPaginationForAll = pages => ({
  type: RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES,
  pages: parse(pages),
});

export const receivedRequestsByDemand = (requests, demand) => ({
  type: RECEIVED_SOULMATE_REQUESTS,
  requests,
  demand,
});

export const receivedRefresh = demand => ({
  type: RECEIVED_SOULMATE_REFRESH,
  demand,
  refreshAt: moment(),
});

export const receivedClarify = soulmate => ({
  type: RECEIVED_SOULMATE_CLARIFY,
  soulmate,
});
