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
  requestedProperty,
  receivedProperty,
  receivedReconsideration,
  requestedReconsidering,
} from './actions';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { loadOptions } from './../schema';
import { readableDescription } from './../description/endpoints';

const options = async () => loadOptions('v1/demands');

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
    .then(async (response) => {
      dispatch(receivedSingle(
        id,
        readableDescription(response.data, await options()),
        response.headers.etag,
      ));
      return response.data;
    });
};

export const add = demand => (dispatch) => {
  dispatch(requestedAdding(demand));
  axios.post('/v1/demands', demand)
    .then(response => dispatch(addedDemand(demand, response.headers.location)))
    .then(() => dispatch(receivedSuccessMessage('Demand has been added')))
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (id, demand, etag) => (dispatch) => {
  const reconsidered = omit(omit(omit(demand, 'created_at'), 'id'), 'seeker_id');
  dispatch(requestedReconsidering(id, reconsidered));
  axios.put(`/v1/demands/${id}`, reconsidered, { headers: { 'if-match': etag } })
    .then(response => dispatch(receivedReconsideration(id, response.data)))
    .catch(error => dispatch(receivedApiError(error)));
};

export const timelineSides = () => (dispatch) => {
  dispatch(requestedProperty('timelineSides'));
  options()
    .then(option => dispatch(receivedProperty('timelineSides', option.location.met_at.timeline_side)));
};
