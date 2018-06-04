// @flow
export const RECEIVED_SCHEMA_OPTIONS = 'RECEIVED_SCHEMA_OPTIONS';
export const REQUESTED_SCHEMA_OPTIONS = 'REQUESTED_SCHEMA_OPTIONS';
export const RECEIVED_SCHEMA = 'RECEIVED_SCHEMA';
export const REQUESTED_SCHEMA = 'REQUESTED_SCHEMA';

export const receivedSchema = (schema: Object) => ({
  type: RECEIVED_SCHEMA,
  schema,
  fetching: false,
});

export const receivedOptions = (options: Object) => ({
  type: RECEIVED_SCHEMA_OPTIONS,
  options,
  fetching: false,
});

export const requestedSchema = () => ({
  type: RECEIVED_SCHEMA,
  fetching: true,
});

export const requestedOptions = () => ({
  type: RECEIVED_SCHEMA_OPTIONS,
  fetching: true,
});
