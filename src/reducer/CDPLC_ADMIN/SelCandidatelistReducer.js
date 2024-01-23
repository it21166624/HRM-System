import {
  SELLIST_REQUEST,
  SELLIST_SUCCESS,
  SELLIST_FAIL,
  SELPASSLIST_REQUEST,
  SELPASSLIST_SUCCESS,
  SELPASSLIST_FAIL,
} from "../../constant/CDPLC_ADMIN/SelectCandidatelistConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const GetAppliedJobsUserList = (state = initialState, action) => {
  switch (action.type) {
    case SELLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case SELLIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const GetPassUserList = (state = initialState, action) => {
  switch (action.type) {
    case SELPASSLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELPASSLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case SELPASSLIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
