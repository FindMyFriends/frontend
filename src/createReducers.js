import { combineReducers } from 'redux';
import { demand } from './demand/reducers';
import { soulmate } from './soulmate/reducers';
import { message } from './ui/reducers';

const createReducers = combineReducers({
  demand,
  soulmate,
  message,
});

export default createReducers;
