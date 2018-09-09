// @flow
import axios from 'axios';
import { omit } from 'lodash';
import { requestedPlace, receivedPlace } from './actions';
import { fetchedPlaces } from './selects';

export type Coordinates = {|
  +latitude: number,
  +longitude: number,
|};

export const omittedSpot = (spot: Object) => omit(spot, ['demand_id', 'evolution_id', 'assigned_at', 'id']);

const place = (
  id: string,
  coordinates: Coordinates,
) => (dispatch: (mixed) => Object, getState: () => Object) => {
  if (fetchedPlaces(id, getState())) return;
  dispatch(requestedPlace(id));
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}`,
    {
      transformRequest: [(data, headers) => {
        delete headers.common.Authorization; // eslint-disable-line
        return data;
      }],
    },
  )
    .then(response => response.data.results[0].formatted_address)
    .then(address => dispatch(receivedPlace(id, address)))
    .catch(() => dispatch(receivedPlace(id, 'unknown', true)));
};

export const places = (spots: Array<Object>) => (dispatch: (mixed) => Object) => {
  Promise.all(spots.map(spot => dispatch(place(spot.id, spot.coordinates))));
};

export const move = (spots: Array<Object>) => (
  Promise.all(spots.map(spot => (axios.put(`/spots/${spot.id}`, omittedSpot(spot)))))
);

export const newSpots = (spots: Array<Object>): Array<Object> => spots.filter(spot => typeof spot.id === 'undefined');

export const forgottenSpots = (
  passed: Array<Object>,
  stored: Array<Object>,
): Array<Object> => {
  const ids = passed.map(spot => spot.id).filter(spot => spot);
  return stored.filter(spot => !ids.includes(spot.id));
};

export const movedSpots = (
  passed: Array<Object>,
  stored: Array<Object>,
): Array<Object> => {
  const ids = stored.map(spot => spot.id).filter(spot => spot);
  return passed.filter(spot => ids.includes(spot.id));
};
