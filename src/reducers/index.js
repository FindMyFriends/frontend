// @flow
import { combineReducers } from 'redux';
import demand from '../demand/reducers';
import message from '../ui/reducers';
import schema from '../schema/reducers';
import soulmate from '../soulmate/reducers';
import evolution from '../evolution/reducers';
import spot from '../spot/reducers';

export default combineReducers({
  demand,
  message,
  schema,
  soulmate,
  evolution,
  spot,
});
