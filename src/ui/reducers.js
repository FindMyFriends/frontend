// @flow
import {
  RECEIVED_API_ERROR,
  DISCARDED_MESSAGE,
  RECEIVED_SUCCESS,
  REQUESTED_CONFIRM,
} from './actions';

type State = {|
  +content: ?string,
  +type: ?string,
  +action: () => mixed,
|};
const init = {
  content: null,
  type: null,
  action: () => null,
};
export default (state: State = init, action: Object): State => {
  switch (action.type) {
    case RECEIVED_API_ERROR:
    case RECEIVED_SUCCESS:
    case DISCARDED_MESSAGE:
      return {
        ...state,
        content: action.content,
        type: action.type,
      };
    case REQUESTED_CONFIRM:
      return {
        ...state,
        content: action.content,
        type: action.type,
        action: action.action,
      };
    default:
      return state;
  }
};
