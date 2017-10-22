import parse from 'parse-link-header';

export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const RECEIVED_PAGINATION_FOR_ALL_DEMANDS = 'RECEIVED_PAGINATION_FOR_ALL_DEMANDS';
export const REQUESTED_ALL_DEMANDS = 'REQUSTED_ALL_DEMANDS';
export const RECEIVED_SINGLE_DEMAND = 'RECEIVED_SINGLE_DEMAND';
export const REQUESTED_SINGLE_DEMAND = 'REQUSTED_SINGLE_DEMAND';
export const ADDED_DEMAND = 'ADDED_DEMAND';
export const REQUESTED_ADDING_DEMAND = 'REQUESTED_ADDING_DEMAND';

export const receivedAll = demands => ({
  type: RECEIVED_ALL_DEMANDS,
  demands,
});

export const receivedPaginationForAll = pages => ({
  type: RECEIVED_PAGINATION_FOR_ALL_DEMANDS,
  pages: parse(pages),
});

export const requestedAll = () => ({
  type: REQUESTED_ALL_DEMANDS,
});

export const receivedSingle = (id, demand) => ({
  type: RECEIVED_SINGLE_DEMAND,
  id,
  demand,
});

export const requestedSingle = id => ({
  type: REQUESTED_SINGLE_DEMAND,
  id,
});

export const addedDemand = (demand, location) => ({
  type: ADDED_DEMAND,
  demand,
  location,
});

export const requestedAdding = demand => ({
  type: REQUESTED_ADDING_DEMAND,
  demand,
});
