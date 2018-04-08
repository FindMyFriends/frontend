// @flow
import axios from 'axios';
import {
  receivedAllByDemand,
  receivedPaginationForAll,
  receivedRequestsByDemand,
  receivedRefresh,
} from './actions';
import { receivedApiError, receivedSuccess as receivedSuccessMessage } from './../ui/actions';

export const all = (demand: string, pagination: Object = {
  page: 1,
  perPage: 20,
}) => (dispatch: (mixed) => Object) => {
  const fields = ['id', 'evolution_id', 'is_correct', 'is_new', 'position'];
  axios.get(`/v1/demands/${demand}/soulmates?page=${pagination.page}&per_page=${pagination.perPage}&fields=${fields.join(',')}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(demand, response.headers.link));
      dispatch(receivedAllByDemand(response.data, demand));
    });
};

export const requests = (demand: string) => (dispatch: (mixed) => Object) => {
  const fields = ['is_refreshable', 'refreshable_in'];
  axios.get(`/v1/demands/${demand}/soulmate_requests?page=1&per_page=1&sort=-searched_at&fields=${fields.join(',')}`)
    .then((response) => {
      dispatch(receivedRequestsByDemand(response.data, demand));
    });
};

export const refresh = (demand: string) => (dispatch: (mixed) => Object) => {
  axios.post(`/v1/demands/${demand}/soulmate_requests`)
    .then(() => {
      dispatch(receivedRefresh(demand));
      dispatch(receivedSuccessMessage('Refresh has began'));
    })
    .catch(error => dispatch(receivedApiError(error)));
};
