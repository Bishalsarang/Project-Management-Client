import { CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE } from '../actions/projectAction';

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
