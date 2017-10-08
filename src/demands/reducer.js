import { FETCH_ALL_DEMANDS } from './actions';

const demands = (state = {}, action) => {
  const { demands, type } = action;
  switch (type) {
    case FETCH_ALL_DEMANDS:
      return demands;
    default:
      return state;
  }
};

export default demands;
