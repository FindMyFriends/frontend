// @flow
import axios from 'axios';
import moment from 'moment';
import {
  receivedAll,
  receivedPaginationForAll,
  receivedSingle,
  receivedOptions,
  receivedSchema,
  extendedEvolution,
} from './actions';

import { loadOptions, loadSchema } from '../api/schema';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from '../ui/actions';

export const options = () => (dispatch: (mixed) => Object) => {
  return loadOptions('/v1/evolutions')
    .then(options => dispatch(receivedOptions(options)));
};

export const schema = () => (dispatch: (mixed) => Object) => {
  return loadSchema('/schema/v1/evolution/get.json')
    .then(schema => dispatch(receivedSchema(schema)));
};

export const single = (id: string, fields: Array<string> = []) => (dispatch: (mixed) => Object) => {
  return axios.get(`/v1/evolutions/${id}?fields=${fields.join(',')}`)
    .then((response) => {
      dispatch(receivedSingle(id, response.data, response.headers.etag));
      return response.data;
    });
};

export const all = (pagination: Object = {
  page: 1,
  perPage: 20,
}, sorts: Array<String>) => (dispatch: (mixed) => Object) => {
  const fields = ['id', 'evolved_at'];
  axios.get(`/v1/evolutions?page=${pagination.page}&per_page=${pagination.perPage}&fields=${fields.join(',')}&sort=${sorts.join(',')}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(response.headers.link));
      dispatch(receivedAll(response.data));
    });
};

export const extend = (progress: Object, history: Object) => (dispatch: (mixed) => Object) => {
  console.log(moment().toISOString(true));
  return axios.post(
    '/v1/evolutions',
    {
      ...progress,
      evolved_at: moment().toISOString(true),
    },
  )
    .then((response) => {
      const extension = dispatch(extendedEvolution(progress, response.headers.location));
      dispatch(receivedSuccessMessage('Evolution has been extended'));
      history.push(`/evolutions/${extension.id}`);
    })
    .catch(error => dispatch(receivedApiError(error)));
};
