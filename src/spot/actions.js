// @flow

export const RECEIVED_PLACE = 'RECEIVED_PLACE';
export const REQUESTED_PLACE = 'REQUESTED_PLACE';

export const receivedPlace = (id: string, address: string, failed: boolean) => ({
  type: RECEIVED_PLACE,
  id,
  address,
  failed,
  fetching: false,
});

export const requestedPlace = (id: string) => ({
  type: REQUESTED_PLACE,
  id,
  fetching: true,
});

