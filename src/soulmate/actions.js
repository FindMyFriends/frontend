import parse from 'parse-link-header';

export const RECEIVED_ALL_DEMAND_SOULMATES = 'RECEIVED_ALL_DEMAND_SOULMATES';
export const RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES = 'RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES';

export const receivedAllByDemand = (soulmates, demand) => ({
  type: RECEIVED_ALL_DEMAND_SOULMATES,
  soulmates,
  demand,
});

export const receivedPaginationForAll = pages => ({
  type: RECEIVED_PAGINATION_FOR_ALL_DEMAND_SOULMATES,
  pages: parse(pages),
});
