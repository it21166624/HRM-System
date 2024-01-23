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

export const getRegister = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
