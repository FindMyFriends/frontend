import { RECEIVED_ALL_DEMANDS, REQUESTED_ALL_DEMANDS } from './actions';

const demands = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVED_ALL_DEMANDS:
      return action.demands;
    case REQUESTED_ALL_DEMANDS:
      return state;
    default:
      return state;
  }
};

export default demands;
