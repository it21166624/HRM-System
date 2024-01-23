import {
  SELLIST_REQUEST,
  SELLIST_SUCCESS,
  SELLIST_FAIL,
  SELPASSLIST_REQUEST,
  SELPASSLIST_SUCCESS,
  SELPASSLIST_FAIL,
} from "../../constant/CDPLC_ADMIN/SelectCandidatelistConstant";

import SelecteCandidatelistServices from "../../serveices/CDPLC_ADMIN/SelecteCandidatelistServices";

export const GetAppliedJobsUserList =
  (sectionalId, positionalId, sortType) => async (dispatch) => {
    dispatch({
      type: SELLIST_REQUEST,
    });

    return await SelecteCandidatelistServices.GetAppliedJobsUserList(
      sectionalId,
      positionalId,
      sortType
    ).then(
      (data) => {
        if (data.data.statusCode === 200) {
          dispatch({
            type: SELLIST_SUCCESS,
            payload: {
              data: data.data.resultSet,
            },
          });
        } else {
          dispatch({
            type: SELLIST_FAIL,
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
          type: SELLIST_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
    return Promise.resolve();
  };

export const GetPassUserList =
  (sectionalId, positionalId) => async (dispatch) => {
    dispatch({
      type: SELPASSLIST_REQUEST,
    });

    return await SelecteCandidatelistServices.GetPassUserList(
      sectionalId,
      positionalId
    ).then(
      (data) => {
        if (data.data.statusCode === 200) {
          dispatch({
            type: SELPASSLIST_SUCCESS,
            payload: {
              data: data.data.resultSet,
            },
          });
        } else {
          dispatch({
            type: SELPASSLIST_FAIL,
            payload: {
              msg: "Failed to load pass users",
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
          type: SELPASSLIST_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
    return Promise.resolve();
  };
