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
import { prettyDescription } from './../description/endpoints';

const options = async () => loadOptions('/v1/demands');

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

export const readableSingle = id => (dispatch) => {
  dispatch(requestedSingle(id));
  axios.get(`/v1/demands/${id}`)
    .then(async (response) => {
      dispatch(receivedSingle(id, prettyDescription(response.data, await options()), response.headers.etag, 'pretty'));
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
    .then(() => history.push(`/demands/${id}`))
    .catch(error => dispatch(receivedApiError(error)));
};

export const timelineSides = () => (dispatch) => {
  dispatch(requestedProperty('timelineSides'));
  options()
    .then(option => dispatch(receivedProperty('timelineSides', option.location.met_at.timeline_side)));
};
