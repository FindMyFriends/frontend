import { RECEIVED_API_ERROR, DISCARDED_MESSAGE, RECEIVED_SUCCESS } from './actions';

export const message = (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_API_ERROR:
    case RECEIVED_SUCCESS:
    case DISCARDED_MESSAGE:
      return { ...state, content: action.content, severity: action.severity };
    default:
      return state;
  }
};
