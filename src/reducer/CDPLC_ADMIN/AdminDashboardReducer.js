import {
  GET_DASHBOARD_DETAILS_REQUEST,
  GET_DASHBOARD_DETAILS_SUCCESS,
  GET_DASHBOARD_DETAILS_FAILURE,
} from "../../constant/CDPLC_ADMIN/AdminDashboardConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const AdminDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GET_DASHBOARD_DETAILS_FAILURE:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
