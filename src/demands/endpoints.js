import { unauthorized } from './../http/requests';
import baseUrl from './../http/baseUrl';
import { receivedAll, requestedAll, receivedSingle, requestedSingle } from './actions';

export const all = () => {
  return dispatch => {
    dispatch(requestedAll());
    fetch(baseUrl('/v1/demands'), unauthorized())
    .then(response => response.json())
    .then(demands => dispatch(receivedAll(demands)));
  };
};

export const single = id => {
  return dispatch => {
    dispatch(requestedSingle(id));
    fetch(baseUrl(`/v1/demands/${id}`), unauthorized())
    .then(response => response.json())
    .then(demands => dispatch(receivedSingle(id)));
  };
}
