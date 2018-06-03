// @flow
import {
  RECEIVED_API_ERROR,
  DISCARDED_MESSAGE,
  RECEIVED_SUCCESS,
  REQUESTED_CONFIRM,
} from './actions';

type stateType = {
  +content: ?string,
  +type: ?string,
  +action: () => mixed,
};
const initState = {
  content: null,
  type: null,
  action: () => null,
};
export const message = (state: stateType = initState, action: Object): Object => {
  switch (action.type) {
    case RECEIVED_API_ERROR:
    case RECEIVED_SUCCESS:
    case DISCARDED_MESSAGE:
      return { ...state, content: action.content, type: action.type };
    case REQUESTED_CONFIRM:
      return {
        ...state, content: action.content, type: action.type, action: action.action,
      };
    default:
      return state;
  }
};
