import { SET_FETCH_STATUS } from '../../actions/fetchActions';

const INITIAL_STATE = {
  isFetching: false,
};

const fetchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FETCH_STATUS:
      return { ...state, isFetching: action.payload.flag };

    default:
      return state;
  }
};

export default fetchReducer;
