import { combineReducers } from 'redux';
import { demand } from './demands/reducers';
import { message } from './ui/reducers';

const createReducers = combineReducers({
  demand,
  message,
});

export default createReducers;
