// @flow
export const RECEIVED_SCHEMA_OPTIONS = 'RECEIVED_SCHEMA_OPTIONS';
export const REQUESTED_SCHEMA_OPTIONS = 'REQUESTED_SCHEMA_OPTIONS';
export const RECEIVED_SCHEMA = 'RECEIVED_SCHEMA';
export const REQUESTED_SCHEMA = 'REQUESTED_SCHEMA';

export const receivedSchema = (schema: Object, scope: string) => ({
  type: RECEIVED_SCHEMA,
  schema,
  fetching: false,
  scope,
});

export const receivedOptions = (options: Object, scope: string) => ({
  type: RECEIVED_SCHEMA_OPTIONS,
  options,
  fetching: false,
  scope,
});

export const requestedSchema = (scope: string) => ({
  type: RECEIVED_SCHEMA,
  fetching: true,
  scope,
});

export const requestedOptions = (scope: string) => ({
  type: RECEIVED_SCHEMA_OPTIONS,
  fetching: true,
  scope,
});
