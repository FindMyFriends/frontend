import axios from 'axios';
import omit from 'lodash/omit';
import {
  requestedAdding,
  addedDemand,
  receivedAll,
  requestedAll,
  receivedSingle,
  requestedSingle,
  receivedPaginationForAll,
  receivedReconsideration,
  requestedReconsidering,
  receivedOptions,
  receivedSchema,
} from './actions';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { loadOptions, loadSchema } from './../schema';

export const options = () => (dispatch) => {
  return loadOptions('/v1/demands')
    .then(options => dispatch(receivedOptions(options)));
};

export const schema = () => (dispatch) => {
  return loadSchema('/schema/v1/demand/get.json')
    .then(schema => dispatch(receivedSchema(schema)));
};

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

export const add = (demand, history) => (dispatch) => {
  dispatch(requestedAdding(demand));
  return axios.post('/v1/demands', demand)
    .then((response) => {
      const newDemand = dispatch(addedDemand(demand, response.headers.location));
      dispatch(receivedSuccessMessage('Demand has been added'));
      history.push(`/demands/${newDemand.id}`);
    })
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (id, demand, etag, history) => (dispatch) => {
  const reconsidered = omit(omit(omit(demand, 'created_at'), 'id'), 'seeker_id');
  dispatch(requestedReconsidering(id, reconsidered));
  axios.put(`/v1/demands/${id}`, reconsidered, { headers: { 'if-match': etag } })
    .then(() => dispatch(receivedReconsideration(id)))
    .then(() => dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    .then(() => history.push(`/demands/${id}`))
    .catch(error => dispatch(receivedApiError(error)));
};
