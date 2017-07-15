import { combineReducers } from 'redux';
import groups from './Groups';
import user from './User';

export default combineReducers({
  groups,
  user,
});
