import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  GET_DATA1_REQUEST,
  GET_DATA1_SUCCESS,
  GET_DATA1_FAIL,
  GET_DATA2_REQUEST,
  GET_DATA2_SUCCESS,
  GET_DATA2_FAIL,
  GET_DATA3_REQUEST,
  GET_DATA3_SUCCESS,
  GET_DATA3_FAIL,
  APPLY_JOB_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
} from "../../constant/CANDIDATES/CandidateFromConstant";
import CandidateFromServices from "../../serveices/CANDIDATES/CandidateFromServices";

export const AddUpdateUserdetails =
  (navigate, requestBody) => async (dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST,
    });
    try {
      const response = await CandidateFromServices.AddUpdateUserdetails(
        requestBody
      );
      if (response.statusCode === 200) {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: {
            data: response.resultSet,
          },
        });
        // navigate("/dashboard");
      } else {
        dispatch({
          type: GET_DATA_FAIL,
          payload: {
            msg: "Failed to sending data",
          },
        });
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_DATA_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  };

export const ApplyJob = (jobId) => async (dispatch) => {
  dispatch({
    type: APPLY_JOB_REQUEST,
  });
  try {
    const response = await CandidateFromServices.ApplyJob(jobId);
    if (response.statusCode === 200) {
      dispatch({
        type: APPLY_JOB_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: APPLY_JOB_FAIL,
        payload: {
          msg: "Failed to sending data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: APPLY_JOB_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const getData = (navigate, formData, bio_id) => async (dispatch) => {
  dispatch({
    type: GET_DATA_REQUEST,
  });
  try {
    const response = await CandidateFromServices.getData(formData, bio_id);
    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
      // navigate("/dashboard");
    } else {
      dispatch({
        type: GET_DATA_FAIL,
        payload: {
          msg: "Failed to sending data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_DATA_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const getData1 = (requestDataAll1) => async (dispatch) => {
  dispatch({
    type: GET_DATA1_REQUEST,
  });
  try {
    const response = await CandidateFromServices.getData1(requestDataAll1);
    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA1_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA1_FAIL,
        payload: {
          msg: "Failed to sending data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_DATA1_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const getData2 = (requestDataAll2) => async (dispatch) => {
  dispatch({
    type: GET_DATA2_REQUEST,
  });
  try {
    const response = await CandidateFromServices.getData2(requestDataAll2);

    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA2_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA2_FAIL,
        payload: {
          msg: "Failed to sending data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_DATA2_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const getData3 = (requestDataAll3) => async (dispatch) => {
  dispatch({
    type: GET_DATA3_REQUEST,
  });
  try {
    const response = await CandidateFromServices.getData3(requestDataAll3);

    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA3_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA3_FAIL,
        payload: {
          msg: "Failed to sending data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_DATA3_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
