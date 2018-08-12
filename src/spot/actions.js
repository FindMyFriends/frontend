// @flow

export const RECEIVED_PLACE = 'RECEIVED_PLACE';
export const REQUESTED_PLACE = 'REQUESTED_PLACE';
export const REQUESTED_SPOTS = 'REQUESTED_SPOTS';
export const RECEIVED_SPOTS = 'RECEIVED_SPOTS';

export const receivedPlace = (id: string, address: string, failed: boolean = false) => ({
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

export const receivedSpots = (spots: Array<Object>) => ({
  type: RECEIVED_SPOTS,
  spots,
  fetching: false,
});

export const requestedSpots = () => ({
  type: REQUESTED_SPOTS,
  fetching: true,
});
