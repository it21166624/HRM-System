import {
  JobDates_REQUEST,
  JobDates_SUCCESS,
  JobDates_FAIL,
} from "../../constant/CDPLC_ADMIN/UpdatejobdateConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const updateJobDates = (state = initialState, action) => {
  switch (action.type) {
    case JobDates_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JobDates_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case JobDates_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
