import { ALL } from './endpoints';

const demands = (state = {}, action) => {
  const { demands, type } = action;
  switch (type) {
    case ALL:
      return demands;
    default:
      return state;
  }
};

export default demands;
