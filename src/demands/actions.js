export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const REQUESTED_ALL_DEMANDS = 'REQUSTED_ALL_DEMANDS';

export const received = demands => ({
  type: RECEIVED_ALL_DEMANDS,
  demands,
});

export const requested = () => ({
  type: REQUESTED_ALL_DEMANDS,
});
