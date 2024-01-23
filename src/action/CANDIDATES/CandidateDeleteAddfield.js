import {
  GET_DATA1_Delete_REQUEST,
  GET_DATA1_Delete_SUCCESS,
  GET_DATA1_Delete_FAIL,
  GET_DATA2_Delete_REQUEST,
  GET_DATA2_Delete_SUCCESS,
  GET_DATA2_Delete_FAIL,
  GET_DATA3_Delete_REQUEST,
  GET_DATA3_Delete_SUCCESS,
  GET_DATA3_Delete_FAIL,
} from "../../constant/CANDIDATES/CandidateDeleteAddfieldConstant";
import CandidateDeleteAddfieldServices from "../../serveices/CANDIDATES/CandidateDeleteAddfieldService";

export const DeleteHigherEducationDetails = (requestDataAll1) => async (dispatch) => {
  dispatch({
    type: GET_DATA1_Delete_REQUEST,
  });
  try {
    const response = await CandidateDeleteAddfieldServices.DeleteHigherEducationDetails(
      requestDataAll1
    );
    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA1_Delete_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA1_Delete_FAIL,
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
      type: GET_DATA1_Delete_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const DeleteEmployeeDetails = (requestDataAll2) => async (dispatch) => {
  dispatch({
    type: GET_DATA2_Delete_REQUEST,
  });
  try {
    const response = await CandidateDeleteAddfieldServices.DeleteEmployeeDetails(
      requestDataAll2
    );

    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA2_Delete_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA2_Delete_FAIL,
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
      type: GET_DATA2_Delete_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const DeleteProfessionalDetails = (requestDataAll3) => async (dispatch) => {
  dispatch({
    type: GET_DATA3_Delete_REQUEST,
  });
  try {
    const response = await CandidateDeleteAddfieldServices.DeleteProfessionalDetails(
      requestDataAll3
    );

    if (response.statusCode === 200) {
      dispatch({
        type: GET_DATA3_Delete_SUCCESS,
        payload: {
          data: response.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DATA3_Delete_FAIL,
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
      type: GET_DATA3_Delete_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
