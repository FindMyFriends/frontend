// @flow
import {
  RECEIVED_SORTING,
  RECEIVED_PAGINATION,
  RECEIVED_INIT_SORTING_AND_PAGING,
} from './actions';

export default (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case RECEIVED_SORTING:
      return {
        ...state,
        [action.source]: {
          ...state[action.source],
          pagination: {
            ...state[action.source].pagination,
            page: 1,
          },
          sorting: action.sorting,
        },
      };
    case RECEIVED_PAGINATION:
      return {
        ...state,
        [action.source]: {
          ...state[action.source],
          pagination: action.pagination,
        },
      };
    case RECEIVED_INIT_SORTING_AND_PAGING:
      return {
        ...state,
        [action.source]: {
          pagination: action.pagination,
          sorting: action.sorting,
          ...state[action.source],
        },
      };
    default:
      return state;
  }
};
