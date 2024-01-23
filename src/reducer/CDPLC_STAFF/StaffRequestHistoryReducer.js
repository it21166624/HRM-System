import {
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
} from "../../constant/CDPLC_STAFF/StaffRequestHistoryConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
  getHistory: false,
  updateJobStatusDetails: false,
};

export const getHistory = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case HISTORY_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};
export const updateJobStatusDetails = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case UPDATE_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};
