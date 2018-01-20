import axios from 'axios';
import {
  requestedAdding,
  addedDemand,
  receivedAll,
  requestedAll,
  receivedSingle,
  requestedSingle,
  receivedPaginationForAll,
  requestedProperty,
  receivedProperty,
  receivedReconsideration,
  requestedReconsidering,
} from './actions';
import loadSchema from './../schema';

const schema = (method = 'GET') => loadSchema(`schema/v1/demand/${method.toLowerCase()}.json`);

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
  return axios.get(`/v1/demands/${id}`)
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    });
};

export const add = demand => (dispatch) => {
  dispatch(requestedAdding(demand));
  axios.post('/v1/demands', demand)
    .then(response => dispatch(addedDemand(demand, response.headers.location)));
};

export const reconsider = (id, demand, etag) => (dispatch) => {
  dispatch(requestedReconsidering(id, demand));
  axios.put(`/v1/demands/${id}`, demand, { headers: { 'if-match': etag } })
    .then(response => dispatch(receivedReconsideration(id, response.data)));
};

export const timelineSides = () => (dispatch) => {
  dispatch(requestedProperty('timelineSides'));
  schema()
    .then(schema => dispatch(receivedProperty('timelineSides', schema.properties.location.properties.met_at.properties.timeline_side.enum.filter(side => side))));
};
