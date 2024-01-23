import { LOGOUT_SUCCESS } from "../../constant/CANDIDATES/CandidateLoginConstant";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
} from "../../constant/CANDIDATES/CandidateProfileConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
  profileDataDispatch: false,
};

export const getProfile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
        profileDataDispatch: true,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        profileDataDispatch: false,
      };
    default:
      return state;
  }
};
