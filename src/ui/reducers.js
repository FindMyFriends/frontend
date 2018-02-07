import { RECEIVED_API_ERROR, DISCARDED_ERROR } from './actions';

export const error = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_API_ERROR:
      return { ...state, message: action.message };
    case DISCARDED_ERROR:
      return { ...state, message: null };
    default:
      return state;
  }
};
