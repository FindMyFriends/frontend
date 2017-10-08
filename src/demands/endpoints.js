import { authorized } from './../http/requests';
import baseUrl from './../http/baseUrl';
import { received, requested } from './actions';

export const all = () => {
  return dispatch => {
    dispatch(requested());
    fetch(baseUrl('/v1/demands'), authorized())
    .then(response => response.json())
    .then(demands => dispatch(received(demands)));
  };
};
