import axios from 'axios';
import {
  requestedAdding,
  addedDemand,
  receivedAll,
  requestedAll,
  receivedSingle,
  requestedSingle,
  receivedPaginationForAll,
} from './actions';

export const all = (pagination = { page: 1, perPage: 20 }) => (dispatch) => {
  dispatch(requestedAll());
  axios.get(`/v1/demands?page=${pagination.page}&per_page=${pagination.perPage}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(response.headers.link));
      dispatch(receivedAll(response.data));
    });
};

export const single = id => (dispatch) => {
  dispatch(requestedSingle(id));
  axios.get(`/v1/demands/${id}`)
    .then(response => dispatch(receivedSingle(id, response.data)));
};

export const add = demand => (dispatch) => {
  dispatch(requestedAdding(demand));
  axios.post('/v1/demands', demand)
    .then(response => dispatch(addedDemand(demand, response.headers.location)));
};
