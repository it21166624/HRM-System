// StaffRequestHistoryActions.js

import {
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from "../../constant/CDPLC_STAFF/StaffRequestHistoryConstant";

import StaffRequestHistoryServices from "../../serveices/CDPLC_STAFF/StaffRequestHistoryServices";

export const getHistory = () => async (dispatch) => {
  dispatch({
    type: HISTORY_REQUEST,
  });

  try {
    const data = await StaffRequestHistoryServices.getHistory();

    if (data.data.statusCode === 200) {
      dispatch({
        type: HISTORY_SUCCESS,
        payload: {
          data: data.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: HISTORY_FAIL,
        payload: {
          msg: "Failed to load leave balance",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: HISTORY_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const updateJobStatusDetails = (jobId) => async (dispatch) => {
  dispatch({
    type: UPDATE_REQUEST,
  });

  try {
    const response = await StaffRequestHistoryServices.updateJobStatusDetails(
      jobId
    );

    if (response.data.statusCode === 200) {
      dispatch({
        type: UPDATE_SUCCESS,
        payload: {
          msg: "Job details updated successfully",
        },
      });
    } else {
      dispatch({
        type: UPDATE_FAIL,
        payload: {
          msg: "Failed to update job details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: UPDATE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
