// TODO: Flow
import { fromHeader } from '../dataset/pagination';

export const RECEIVED_ALL_DEMANDS = 'RECEIVED_ALL_DEMANDS';
export const RECEIVED_PAGINATION_DEMANDS = 'RECEIVED_PAGINATION_DEMANDS';
export const RECEIVED_TOTAL_DEMANDS = 'RECEIVED_TOTAL_DEMANDS';
export const RECEIVED_SINGLE_DEMAND = 'RECEIVED_SINGLE_DEMAND';
export const ADDED_DEMAND = 'ADDED_DEMAND';
export const RECEIVED_DEMAND_RECONSIDER = 'RECEIVED_DEMAND_RECONSIDER';
export const RECEIVED_DEMAND_OPTIONS = 'RECEIVED_DEMAND_OPTIONS';
export const RECEIVED_DEMAND_SCHEMA = 'RECEIVED_DEMAND_SCHEMA';

// TODO: Move to schema reducer
export const receivedSchema = schema => ({
  type: RECEIVED_DEMAND_SCHEMA,
  schema,
});

// TODO: Move to schema reducer
export const receivedOptions = options => ({
  type: RECEIVED_DEMAND_OPTIONS,
  options,
});

export const receivedAll = demands => ({
  type: RECEIVED_ALL_DEMANDS,
  demands,
});

export const receivedPagination = (link: string) => ({
  type: RECEIVED_PAGINATION_DEMANDS,
  pagination: fromHeader(link),
});

export const receivedTotal = (total: string) => ({
  type: RECEIVED_TOTAL_DEMANDS,
  total: parseInt(total, 10)
});

export const receivedSingle = (id, demand, etag) => ({
  type: RECEIVED_SINGLE_DEMAND,
  id,
  demand,
  etag,
});

export const addedDemand = (demand, location) => ({
  type: ADDED_DEMAND,
  demand,
  id: location.substring(location.lastIndexOf('/') + 1),
});

export const receivedReconsideration = id => ({
  type: RECEIVED_DEMAND_RECONSIDER,
  id,
});