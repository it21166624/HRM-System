import {
  GET_STAFF_DASHBOARD_DETAILS_REQUEST,
  GET_STAFF_DASHBOARD_DETAILS_SUCCESS,
  GET_STAFF_DASHBOARD_DETAILS_FAILURE,
} from "../../constant/CDPLC_STAFF/StaffDashboardConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const StaffDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STAFF_DASHBOARD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STAFF_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GET_STAFF_DASHBOARD_DETAILS_FAILURE:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
