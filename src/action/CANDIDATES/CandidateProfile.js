import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../../constant/CANDIDATES/CandidateProfileConstant";

import CandidateProfileServices from "../../serveices/CANDIDATES/CandidateProfileServices";

export const getProfile = (reg_id) => async (dispatch) => {
  dispatch({
    type: PROFILE_REQUEST,
  });

  return await CandidateProfileServices.getProfile(reg_id).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: PROFILE_FAIL,
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
        type: PROFILE_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};
