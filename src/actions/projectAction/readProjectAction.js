import axios from 'axios';
import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const FETCH_PROJECT_REQUEST = 'FETCH_PROJECT_REQUEST';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_FAILURE = 'FETCH_PROJECT_FAILURE';

export const fetchProjectRequest = () => ({
  type: FETCH_PROJECT_REQUEST,
});

export const fetchProjectSuccess = (projects) => ({
  type: FETCH_PROJECT_SUCCESS,
  payload: { projects },
});

export const fetchProjectFailure = (error) => ({ type: FETCH_PROJECT_FAILURE, payload: { error } });

export const readProject = () => {
  return async (dispatch) => {
    dispatch(fetchProjectRequest());

    try {
      const res = await fetcher.get(constants.API_GET_PROJECTS_URL);
      const { data } = res.data;

      dispatch(fetchProjectSuccess(data));

      return data;
    } catch (error) {
      console.log(error);

      return dispatch(fetchProjectFailure(error));
    }
  };
};
