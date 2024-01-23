import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
} from "../../constant/CANDIDATES/CandidateProfileEditConstant";

import CandidateProfileEditServices from "../../serveices/CANDIDATES/CandidateProfileEditServices";

export const editProfile = (requestBodyData) => async (dispatch) => {
  dispatch({
    type: EDIT_REQUEST,
  });

  try {
    const response = await CandidateProfileEditServices.editProfile(
      requestBodyData
    );

    if (response.statusCode === 200) {
      dispatch({
        type: EDIT_SUCCESS,
        payload: {
          data: response.resultSet,
          user: "test",
        },
      });
      // notify("Edit successfull", "success");
    } else {
      dispatch({
        type: EDIT_FAIL,
        payload: {
          msg: "Failed to register",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: EDIT_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const uploadImage = (imageFormData, nic, reg_id) => async (dispatch) => {
  try {
    const response = await CandidateProfileEditServices.uploadUserImage(
      imageFormData,
      nic,
      reg_id
    );
    if (response.statusCode === 200) {
      dispatch({
        type: IMAGE_UPLOAD_SUCCESS,
      });
    } else {
      dispatch({
        type: IMAGE_UPLOAD_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: IMAGE_UPLOAD_FAIL,
    });
  }
};
