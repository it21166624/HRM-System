import {
  GET_DASHBOARD_DETAILS_REQUEST,
  GET_DASHBOARD_DETAILS_SUCCESS,
  GET_DASHBOARD_DETAILS_FAILURE,
} from "../../constant/CDPLC_ADMIN/AdminDashboardConstant";

import AdminDashboardServices from "../../serveices/CDPLC_ADMIN/AdminDashboardServices";

export const AdminDashboardAction = () => async (dispatch) => {
  dispatch({
    type: GET_DASHBOARD_DETAILS_REQUEST,
  });
  try {
    const response = await AdminDashboardServices.AdminServices();

    if (response.data.statusCode === 200) {
      dispatch({
        type: GET_DASHBOARD_DETAILS_SUCCESS,
        payload: {
          data: response.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: GET_DASHBOARD_DETAILS_FAILURE,
        payload: {
          msg: "Failed to load job details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_DASHBOARD_DETAILS_FAILURE,
      payload: {
        msg: message,
      },
    });
  }
};
