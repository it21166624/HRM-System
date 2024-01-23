import {
  ACCEPT_JOB_FAIL,
  ACCEPT_JOB_REQUEST,
  ACCEPT_JOB_SUCCESS,
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_SECTION_REQUEST,
  GET_SECTION_SUCCESS,
  GET_SECTION_FAIL,
  GET_ALL_JOB_SUCCESS,
  GET_APPLIED_JOB_FAIL,
  GET_APPLIED_JOB_REQUEST,
  GET_APPLIED_JOB_SUCCESS,
  GET_APPLIED_JOB_DETAILS_FAIL,
  GET_APPLIED_JOB_DETAILS_REQUEST,
  GET_APPLIED_JOB_DETAILS_SUCCESS,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAIL,
} from "../../constant/CDPLC_ADMIN/AdminConstant";

import AdminServices from "../../serveices/CDPLC_ADMIN/AdminServices";

export const AdminGetJobDetails = (jobId) => async (dispatch) => {
  dispatch({
    type: HISTORY_REQUEST,
  });

  try {
    const data = await AdminServices.AdminGetJobDetails(jobId);

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

export const AdminGetsectionsList = () => async (dispatch) => {
  dispatch({
    type: GET_SECTION_REQUEST,
  });

  try {
    const response = await AdminServices.AdminGetsectionsList();

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

export const AcceptJobs = (jobId) => async (dispatch) => {
  dispatch({
    type: ACCEPT_JOB_REQUEST,
  });
  try {
    const response = await AdminServices.AcceptJobs(jobId);

    if (response.data.statusCode === 200) {
      dispatch({
        type: ACCEPT_JOB_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
      dispatch({
        type: ACCEPT_JOB_FAIL,
        payload: {
          msg: "Failed to accept job.",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ACCEPT_JOB_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetAllJobs = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_JOB_REQUEST,
  });
  try {
    const response = await AdminServices.GetAllJobs();

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

export const GetAppliedJobsDetails = (jobId) => async (dispatch) => {
  dispatch({
    type: GET_APPLIED_JOB_DETAILS_REQUEST,
  });
  try {
    const response = await AdminServices.GetAppliedJobsDetails(jobId);

    if (response.data.statusCode === 200) {
      dispatch({
        type: GET_APPLIED_JOB_DETAILS_SUCCESS,
        payload: {
          data: response.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_APPLIED_JOB_DETAILS_FAIL,
        payload: {
          msg: "Failed to load applied job details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_APPLIED_JOB_DETAILS_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
