import {
  BANNER_FAIL,
  BANNER_REQUEST,
  BANNER_SUCCESS,
} from "../../constant/CANDIDATES/commonConstant";
import {
  HEAD_ACCESS_FAIL,
  HEAD_ACCESS_REQUEST,
  HEAD_ACCESS_SUCCESS,
} from "../../constant/CANDIDATES/HeadAccessContant";

import CommonService from "../../serveices/CANDIDATES/CommonService";
export const getBannerImages = () => async (dispatch) => {
  dispatch({
    type: BANNER_REQUEST,
  });

  return await CommonService.getBannerImages().then(
    (data) => {
      if (data.status === 200) {
        dispatch({
          type: BANNER_SUCCESS,
          payload: {
            responseBody: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: BANNER_FAIL,
          payload: {
            msg: "Failed to load banner images",
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
        type: BANNER_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const GetAccessHeadComponent = () => async (dispatch) => {
  dispatch({
    type: HEAD_ACCESS_REQUEST,
  });

  return await CommonService.GetAccessHeadComponent().then(
    (data) => {
      if (data.status === 200) {
        dispatch({
          type: HEAD_ACCESS_SUCCESS,
          payload: {
            headComponent: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: HEAD_ACCESS_FAIL,
          payload: {
            msg: "Failed to load header component",
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
        type: HEAD_ACCESS_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};
