/**
 * Entry point for Reducers: reducers/index.js.
 * Export  Combined  Reducers.
 */
import { combineReducers } from 'redux';

import fetchReducer from './fetch';

const reducer = combineReducers({
  repo: repoReducer,
  fetch: fetchReducer,
  users: usersReducer,
  profile: profileReducer,
});

export default reducer;
