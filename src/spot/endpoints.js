// @flow
import axios from 'axios';
import { requestedPlace, receivedPlace } from './actions';

export type Coordinates = {|
  +latitude: number,
  +longitude: number,
|};

const place = (id: string, coordinates: Coordinates, next: (void) => {}) => (dispatch) => {
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
    .then(next)
    .catch(() => dispatch(receivedPlace(id, 'unknown', true)));
};

export const places = (spots: Array<Object>, next: (void) => {}) => (dispatch) => {
  Promise.all(spots.map(spot => dispatch(place(spot.id, spot.coordinates))))
    .then(next);
};
