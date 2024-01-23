import {
  CANLIST_REQUEST,
  CANLIST_SUCCESS,
  CANLIST_FAIL,
  ADMSELECT_REQUEST,
  ADMSELECT_SUCCESS,
  ADMSELECT_FAIL,
} from "../../constant/CDPLC_ADMIN/GetCandidatelistConstant";

import GetCandidatelistServices from "../../serveices/CDPLC_ADMIN/GetCandidatelistServices";

export const getCANLIST = (sectionalId, positionalId) => async (dispatch) => {
  dispatch({
    type: CANLIST_REQUEST,
  });

  return await GetCandidatelistServices.getCANLIST(
    sectionalId,
    positionalId
  ).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: CANLIST_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: CANLIST_FAIL,
          payload: {
            msg: "Failed to load leave balance",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CANLIST_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
  return Promise.resolve();
};

//update status
export const SortJob = (sortType, appliedJobId) => async (dispatch) => {
  dispatch({
    type: ADMSELECT_REQUEST,
  });

  try {
    const response = await GetCandidatelistServices.SortJob(
      sortType,
      appliedJobId
    );

    if (response.statusCode === 200) {
      dispatch({
        type: ADMSELECT_SUCCESS,
        payload: {
          data: response.resultSet,
          user: "test",
        },
      });
      // dispatch(getHistory());
    } else {
      dispatch({
        type: ADMSELECT_FAIL,
        payload: {
          msg: "Failed date update ",
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
      type: ADMSELECT_FAIL,
      payload: {
        msg: message,
      },
    });
    return Promise.reject();
  }
};
