import { combineReducers } from 'redux';
import { demand, demands } from './demands/reducers.js';

const createReducers = combineReducers({
  demand,
  demands,
});

export default createReducers;
