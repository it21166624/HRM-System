// CandidateRegister.js
import {
  ADDJOB_REQUEST,
  ADDJOB_SUCCESS,
  ADDJOB_FAIL,
  GET_SECTION_FAIL,
  GET_SECTION_REQUEST,
  GET_SECTION_SUCCESS,
  SUMMERY_REQUEST,
  SUMMERY_SUCCESS,
  SUMMERY_FAIL,
} from "../../constant/CDPLC_STAFF/StaffAddJobConstant";

import StaffAddJobServices from "../../serveices/CDPLC_STAFF/StaffAddJobServices";

export const StaffGetEmployeeSummary = (user) => async (dispatch) => {
  dispatch({
    type: SUMMERY_REQUEST,
  });

  return await StaffAddJobServices.StaffGetEmployeeSummary(user).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: SUMMERY_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: SUMMERY_FAIL,
          payload: {
            msg: "Failed to load leave balance",
          },
        });
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SUMMERY_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const GetsectionsList = () => async (dispatch) => {
  dispatch({
    type: GET_SECTION_REQUEST,
  });

  try {
    const response = await StaffAddJobServices.GetsectionsList();

    if (response.statusCode === 200) {
      dispatch({
        type: GET_SECTION_SUCCESS,
        payload: {
          data: response.resultSet,
          user: "test",
        },
      });
    } else {
      dispatch({
        type: GET_SECTION_FAIL,
        payload: {
          msg: "Failed to add job",
        },
      });
    }
    return Promise.resolve();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_SECTION_FAIL,
      payload: {
        msg: message,
      },
    });
    return Promise.reject();
  }
};

export const addJob = (requestBodyData) => async (dispatch) => {
  dispatch({
    type: ADDJOB_REQUEST,
  });

  try {
    const response = await StaffAddJobServices.addJob(requestBodyData);

    if (response.statusCode === 200) {
      dispatch({
        type: ADDJOB_SUCCESS,
        payload: {
          data: response.resultSet,
          user: "test",
        },
      });
    } else {
      dispatch({
        type: ADDJOB_FAIL,
        payload: {
          msg: "Failed to add job",
        },
      });
    }
    return Promise.resolve();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ADDJOB_FAIL,
      payload: {
        msg: message,
      },
    });
    return Promise.reject();
  }
};
