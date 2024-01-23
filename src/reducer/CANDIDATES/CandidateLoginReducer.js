import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USERTYPE_FAIL,
  USERTYPE_REQUEST,
  USERTYPE_SUCCESS,
} from "../../constant/CANDIDATES/CandidateLoginConstant";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  data: null,
  msg: null,
  loginDataDispatch: false,
};

export const getLogin = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
        loginDataDispatch: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loginDataDispatch: false,
      };
    default:
      return state;
  }
};

export const UserType = (
  state = {
    loading: false,
    data: null,
    msg: null,
    isLoggedIn: false,
    type: null,
  },
  action
) => {
  switch (action.type) {
    case USERTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USERTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: action.payload.type,
        isLoggedIn: true,
        msg: null,
      };
    case USERTYPE_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        token: null,
        msg: action.payload.msg,
        type: null,
      };
    default:
      return state;
  }
};
