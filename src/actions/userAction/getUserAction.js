import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: { error } });

export const getUsers = () => {
  console.log('heree');

  return async (dispatch) => {
    dispatch(fetchUsersRequest());

    try {
      //  Get all tasks inside project
      const res = await fetcher.get(constants.API_USERS_URL);

      const { data } = res.data;

      dispatch(fetchUsersSuccess(data));

      return data;
    } catch (error) {
      dispatch(fetchUsersFailure(error));
    }
  };
};
