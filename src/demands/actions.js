export const FETCH_ALL_DEMANDS = 'FETCH_ALL_DEMANDS';

export const fetchAllDemands = demands => ({
  type: FETCH_ALL_DEMANDS,
  demands,
});
