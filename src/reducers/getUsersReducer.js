import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions/userAction';

const INITIAL_STATE = {
  isLoading: false,
  users: [],
  error: '',
};

const fetchUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload.users };
    case FETCH_USERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default fetchUsersReducer;
