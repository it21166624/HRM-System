import {
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_ALL_JOB_SUCCESS,
  GET_APPLIED_JOB_FAIL,
  GET_APPLIED_JOB_REQUEST,
  GET_APPLIED_JOB_SUCCESS,
} from "../../constant/CANDIDATES/CandidateJobConstant";

import CandidateJobServices from "../../serveices/CANDIDATES/CandidateJobServices";

export const AdminGetAllJobs = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_JOB_REQUEST,
  });
  try {
    const response = await CandidateJobServices.AdminGetAllJobs();

    if (response.data.statusCode === 200) {
      dispatch({
        type: GET_ALL_JOB_SUCCESS,
        payload: {
          data: response.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_ALL_JOB_FAIL,
        payload: {
          msg: "Failed to load job details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_ALL_JOB_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetAppliedJobsHistory = (reg_id) => async (dispatch) => {
  dispatch({
    type: GET_APPLIED_JOB_REQUEST,
  });

  return await CandidateJobServices.GetAppliedJobsHistory().then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: GET_APPLIED_JOB_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: GET_APPLIED_JOB_FAIL,
          payload: {
            msg: "Failed to load profile",
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
        type: GET_APPLIED_JOB_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};
