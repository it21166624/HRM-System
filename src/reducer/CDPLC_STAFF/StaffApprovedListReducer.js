import {
  STAFFAPLIST_REQUEST,
  STAFFAPLIST_SUCCESS,
  STAFFAPLIST_FAIL,
  ADMSELECT_REQUEST,
  ADMSELECT_SUCCESS,
  ADMSELECT_FAIL,
} from "../../constant/CDPLC_STAFF/StaffApprovedListConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const StaffSortJob = (
  state = { user: null, error: null, data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case ADMSELECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMSELECT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case ADMSELECT_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const StaffGetAppliedJobsUserList = (state = initialState, action) => {
  switch (action.type) {
    case STAFFAPLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STAFFAPLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case STAFFAPLIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
