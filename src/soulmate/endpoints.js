// @flow
import axios from 'axios';
import {
  receivedAllByDemand,
  receivedPaginationForAll,
} from './actions';

export const allByDemand = (demand: string, pagination: Object = {
  page: 1,
  perPage: 20,
}) => (dispatch: (mixed) => Object) => {
  const fields = ['id', 'evolution_id', 'is_correct', 'is_new', 'position'];
  axios.get(`/v1/soulmates?page=${pagination.page}&per_page=${pagination.perPage}&demand_id=${demand}&fields=${fields.join(',')}`)
    .then((response) => {
      dispatch(receivedPaginationForAll(demand, response.headers.link));
      dispatch(receivedAllByDemand(response.data, demand));
    });
};
