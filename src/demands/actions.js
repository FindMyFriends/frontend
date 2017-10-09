export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const REQUESTED_ALL_DEMANDS = 'REQUSTED_ALL_DEMANDS';
export const RECEIVED_SINGLE_DEMAND = 'RECEIVED_SINGLE_DEMAND';
export const REQUESTED_SINGLE_DEMAND = 'REQUSTED_SINGLE_DEMAND';

export const receivedAll = demands => ({
  type: RECEIVED_ALL_DEMANDS,
  demands,
});

export const requestedAll = () => ({
  type: REQUESTED_ALL_DEMANDS,
});

export const receivedSingle = id => ({
  type: RECEIVED_SINGLE_DEMAND,
  id,
});

export const requestedSingle = id => ({
  type: REQUESTED_SINGLE_DEMAND,
  id,
});
