// @flow
import * as response from '../api/response';

export const EVOLUTION = 'EVOLUTION';
export const RECEIVED_EVOLUTIONS = 'RECEIVED_EVOLUTIONS';
export const RECEIVED_EVOLUTION = 'RECEIVED_EVOLUTION';
export const REQUESTED_EVOLUTION = 'REQUESTED_EVOLUTION';
export const REQUESTED_EVOLUTIONS = 'REQUESTED_EVOLUTIONS';
export const INVALIDATED_EVOLUTIONS = 'INVALIDATED_EVOLUTIONS';
export const RECEIVED_EVOLUTIONS_COLUMNS = 'RECEIVED_EVOLUTIONS_COLUMNS';

export const invalidatedAll = () => ({
  type: INVALIDATED_EVOLUTIONS,
});

export const requestedAll = () => ({
  type: REQUESTED_EVOLUTIONS,
  fetching: true,
});

export const requestedSingle = (id: string) => ({
  type: REQUESTED_EVOLUTION,
  id,
  fetching: true,
});

export const receivedAll = (evolutions: Array<Object>, headers: Object) => ({
  type: RECEIVED_EVOLUTIONS,
  evolutions,
  total: response.extractedTotalCount(headers),
  fetching: false,
});

export const receivedSingle = (id: string, evolution: Object, etag: string) => ({
  type: RECEIVED_EVOLUTION,
  id,
  evolution,
  etag,
  fetching: false,
});

export const receivedColumns = (columns: Array<string>) => ({
  type: RECEIVED_EVOLUTIONS_COLUMNS,
  columns,
});
