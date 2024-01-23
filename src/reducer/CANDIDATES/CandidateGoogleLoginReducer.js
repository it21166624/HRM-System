import { LOGOUT_SUCCESS } from "../../constant/CANDIDATES/CandidateLoginConstant";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../constant/CANDIDATES/CandidateRegisterConstant";

const initialState = {
  user: null,
  error: null,
  data: null,
  msg: null,
};

export const getGoogleLogin = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
        loginDataDispatch: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loginDataDispatch: false,
      };
    default:
      return state;
  }
};
