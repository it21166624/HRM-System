import {
  SUMMERY_FAIL,
  SUMMERY_REQUEST,
  SUMMERY_SUCCESS,
} from "../../constant/CANDIDATES/CandidateSummeryConstant";
import {
  ADDJOB_REQUEST,
  ADDJOB_SUCCESS,
  ADDJOB_FAIL,
  GET_SECTION_FAIL,
  GET_SECTION_REQUEST,
  GET_SECTION_SUCCESS,
} from "../../constant/CDPLC_STAFF/StaffAddJobConstant";

const initialState = {
  user: null,
  error: null,
  data: null,
  msg: null,
};

export const StaffGetEmployeeSummary = (
  state = { user: null, error: null, userData: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case SUMMERY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUMMERY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        userData: action.payload.data,
      };
    case SUMMERY_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        userData: [],
      };
    default:
      return state;
  }
};

export const GetsectionsList = (
  state = { user: null, error: null, data: null, msg: null },
  action
) => {
  switch (action.type) {
    case GET_SECTION_REQUEST:
      return {
        ...state,
      };
    case GET_SECTION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
      };
    case GET_SECTION_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const addJob = (state = initialState, action) => {
  switch (action.type) {
    case ADDJOB_REQUEST:
      return {
        ...state,
      };
    case ADDJOB_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
      };
    case ADDJOB_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
