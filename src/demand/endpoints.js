// @flow
import axios from 'axios';
import omit from 'lodash/omit';
import {
  addedDemand,
  receivedAll,
  receivedSingle,
  receivedPaginationForAll,
  receivedReconsideration,
  receivedOptions,
  receivedSchema,
} from './actions';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';
import { loadOptions, loadSchema } from './../api/schema';

export const options = () => (dispatch: (mixed) => Object) => {
  return loadOptions('/v1/demands')
    .then(options => dispatch(receivedOptions(options)));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  return loadSchema('/schema/v1/demand/get.json')
    .then(schema => dispatch(receivedSchema(schema)));
};

export const all = (pagination: Object = {
  page: 1,
  perPage: 20,
}, sorts: Array<String>) => (dispatch: (mixed) => Object) => {
  const fields = ['general', 'soulmates', 'id', 'created_at'];
  axios.get(`/v1/demands?page=${pagination.page}&per_page=${pagination.perPage}&fields=${fields.join(',')}&sort=${sorts.join(',')}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(response.headers.link));
      dispatch(receivedAll(response.data));
    });
};

export const single = (id: string) => (dispatch: (mixed) => Object) => {
  return axios.get(`/v1/demands/${id}`)
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    });
};

export const add = (demand: Object, history: Object) => (dispatch: (mixed) => Object) => {
  return axios.post('/v1/demands', demand)
    .then((response) => {
      const newDemand = dispatch(addedDemand(demand, response.headers.location));
      dispatch(receivedSuccessMessage('Demand has been added'));
      history.push(`/demands/${newDemand.id}`);
    })
    .catch(error => dispatch(receivedApiError(error)));
};

export const reconsider = (
  id: string,
  demand: Object,
  etag: string,
  history: Object,
) => (dispatch: (mixed) => Object) => {
  const reconsidered = omit(omit(omit(demand, 'created_at'), 'id'), 'seeker_id');
  axios.put(`/v1/demands/${id}`, reconsidered, { headers: { 'if-match': etag } })
    .then(() => dispatch(receivedReconsideration(id)))
    .then(() => dispatch(receivedSuccessMessage('Demand has been reconsidered')))
    .then(() => history.push(`/demands/${id}`))
    .catch(error => dispatch(receivedApiError(error)));
};


export const retract = (id: string, history: Object) => (dispatch: (mixed) => Object) => {
  return axios.delete(`/v1/demands/${id}`)
    .then(() => {
      dispatch(receivedSuccessMessage('Demand has been retracted'));
      history.push('/demands');
    })
    .catch(error => dispatch(receivedApiError(error)));
};
