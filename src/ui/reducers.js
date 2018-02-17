// @flow
import { RECEIVED_API_ERROR, DISCARDED_MESSAGE, RECEIVED_SUCCESS, REQUESTED_CONFIRM } from './actions';

export const message = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case RECEIVED_API_ERROR:
    case RECEIVED_SUCCESS:
    case DISCARDED_MESSAGE:
      return { ...state, content: action.content, severity: action.severity };
    case REQUESTED_CONFIRM:
      return {
        ...state, content: action.content, severity: action.severity, action: action.action,
      };
    default:
      return state;
  }
};
