import { combineReducers } from 'redux';
import { demand } from './demand/reducers';
import { evolution } from './evolution/reducers';
import { soulmate } from './soulmate/reducers';
import { message } from './ui/reducers';

const createReducers = combineReducers({
  demand,
  soulmate,
  message,
  evolution,
});

export default createReducers;
