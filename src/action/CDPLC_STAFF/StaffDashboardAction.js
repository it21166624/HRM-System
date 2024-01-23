import {
  GET_STAFF_DASHBOARD_DETAILS_REQUEST,
  GET_STAFF_DASHBOARD_DETAILS_SUCCESS,
  GET_STAFF_DASHBOARD_DETAILS_FAILURE,
} from "../../constant/CDPLC_STAFF/StaffDashboardConstant";

import StaffDashboardServices from "../../serveices/CDPLC_STAFF/StaffDashboardServices";

export const StaffDashboardAction = () => async (dispatch) => {
  dispatch({
    type: GET_STAFF_DASHBOARD_DETAILS_REQUEST,
  });
  try {
    const response = await StaffDashboardServices.StaffServices();

    if (response.data.statusCode === 200) {
      dispatch({
        type: GET_STAFF_DASHBOARD_DETAILS_SUCCESS,
        payload: {
          data: response.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_STAFF_DASHBOARD_DETAILS_FAILURE,
        payload: {
          msg: "Failed to load dashboard details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_STAFF_DASHBOARD_DETAILS_FAILURE,
      payload: {
        msg: message,
      },
    });
  }
};
