import { LOGOUT_SUCCESS } from "../../constant/CANDIDATES/CandidateLoginConstant";
import {
  SUMMERY_REQUEST,
  SUMMERY_SUCCESS,
  SUMMERY_FAIL,
} from "../../constant/CANDIDATES/CandidateSummeryConstant";

const initialState = {
  user: null,
  error: null,
  userData: [],
  msg: null,
  loading: false,
};

export const getSummery = (state = initialState, action) => {
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
