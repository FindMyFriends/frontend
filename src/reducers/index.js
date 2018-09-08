// @flow
import { combineReducers } from 'redux';
import demand from '../demand/reducer';
import message from '../ui/reducer';
import schema from '../schema/reducer';
import soulmate from '../soulmate/reducer';
import evolution from '../evolution/reducer';
import spot from '../spot/reducer';

export default combineReducers({
  demand,
  message,
  schema,
  soulmate,
  evolution,
  spot,
});
