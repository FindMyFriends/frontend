import axios from 'axios';
import {
  requestedSchema,
  receivedSchema,
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

const schema = (method = 'GET') => (dispatch) => {
  dispatch(requestedSchema(method.toUpperCase()));
  return axios.get(`schema/v1/demand/${method.toLowerCase()}.json`)
    .then((response) => {
      dispatch(receivedSchema(response.data));
      return response.data;
    });
};

export const genders = () => (dispatch) => {
  dispatch(requestedProperty('genders'));
  dispatch(schema())
    .then(schema => dispatch(receivedProperty('genders', schema.properties.general.properties.gender.enum)));
};

export const races = () => (dispatch) => {
  dispatch(requestedProperty('races'));
  dispatch(schema())
    .then(schema => dispatch(receivedProperty('races', schema.properties.general.properties.race.enum)));
};

export const ages = () => (dispatch) => {
  dispatch(requestedProperty('races'));
  dispatch(schema())
    .then(schema => dispatch(receivedProperty('ages', schema.properties.general.properties.age.properties.from)));
};
