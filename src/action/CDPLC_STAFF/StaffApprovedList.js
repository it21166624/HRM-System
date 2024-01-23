import {
  STAFFAPLIST_REQUEST,
  STAFFAPLIST_SUCCESS,
  STAFFAPLIST_FAIL,
  ADMSELECT_REQUEST,
  ADMSELECT_SUCCESS,
  ADMSELECT_FAIL,
} from "../../constant/CDPLC_STAFF/StaffApprovedListConstant";

import StaffApprovedListService from "../../serveices/CDPLC_STAFF/StaffApprovedListService";

export const StaffSortJob = (appliedJobId) => async (dispatch) => {
  dispatch({
    type: ADMSELECT_REQUEST,
  });

  try {
    const response = await StaffApprovedListService.StaffSortJob(appliedJobId);

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

export const StaffGetAppliedJobsUserList =
  (sectionalId, positionalId, sortType) => async (dispatch) => {
    dispatch({
      type: STAFFAPLIST_REQUEST,
    });

    return await StaffApprovedListService.StaffGetAppliedJobsUserList(
      sectionalId,
      positionalId,
      sortType
    ).then(
      (data) => {
        if (data.data.statusCode === 200) {
          dispatch({
            type: STAFFAPLIST_SUCCESS,
            payload: {
              data: data.data.resultSet,
            },
          });
        } else {
          dispatch({
            type: STAFFAPLIST_FAIL,
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
          type: STAFFAPLIST_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
    return Promise.resolve();
  };
