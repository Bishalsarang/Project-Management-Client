import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../actions/authAction';

const INITIAL_STATE = {
  isLoading: false,
  user: {},
  error: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, user: action.payload.user };
    case LOGIN_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default loginReducer;
