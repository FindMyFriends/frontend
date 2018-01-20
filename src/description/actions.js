export const REQUESTED_DESCRIPTION_PROPERTY = 'REQUESTED_DESCRIPTION_PROPERTY';
export const RECEIVED_DESCRIPTION_SCHEMA_PROPERTY = 'RECEIVED_DESCRIPTION_SCHEMA_PROPERTY';

export const requestedProperty = property => ({
  type: REQUESTED_DESCRIPTION_PROPERTY,
  property,
});

export const receivedProperty = (property, value) => ({
  type: RECEIVED_DESCRIPTION_SCHEMA_PROPERTY,
  property,
  value,
});
