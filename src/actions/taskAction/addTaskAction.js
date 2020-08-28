import fetcher from '../../utils/axiosIntercept';

import * as constants from '../../constants';

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

export const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST,
});

export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: { task },
});

export const addTaskFailure = (error) => ({ type: ADD_TASK_FAILURE, payload: { error } });

export const addTask = (data) => {
  return async (dispatch) => {
    dispatch(addTaskRequest());

    try {
      const res = await fetcher.post(constants.API_TASKS_URL, data);

      dispatch(addTaskSuccess(res.data));

      return res;
    } catch (error) {
      dispatch(addTaskFailure(error.response.data.message));
    }
  };
};
