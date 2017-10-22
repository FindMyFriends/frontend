import { combineReducers } from 'redux';
import { demand } from './demands/reducers';

const createReducers = combineReducers({
  demand,
});

export default createReducers;
