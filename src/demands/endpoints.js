import axios from 'axios';
import {
  receivedAll,
  requestedAll,
  receivedSingle,
  requestedSingle,
  receivedPaginationForAll
} from './actions';

export const all = () => dispatch => {
  dispatch(requestedAll());
  axios.get('/v1/demands')
  .then(response => {
    dispatch(receivedPaginationForAll(response.headers['Link']));
    dispatch(receivedAll(response.data));
  })
};

export const single = id => dispatch => {
  dispatch(requestedSingle(id));
  axios.get(`/v1/demands/${id}`)
  .then(response => dispatch(receivedSingle(id, response.data)));
};
