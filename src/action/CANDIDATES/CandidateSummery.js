import {
  SUMMERY_REQUEST,
  SUMMERY_SUCCESS,
  SUMMERY_FAIL,
} from "../../constant/CANDIDATES/CandidateSummeryConstant";

import CandidateSummeryServices from "../../serveices/CANDIDATES/CandidateSummeryService";

export const getSummery = (user) => async (dispatch) => {
  // console.log("sdsdsdsd",user);
  dispatch({
    type: SUMMERY_REQUEST,
  });

  return await CandidateSummeryServices.getSummery(user).then(
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
