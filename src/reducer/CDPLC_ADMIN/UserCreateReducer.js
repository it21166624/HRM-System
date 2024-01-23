import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USERGETLIST_REQUEST,
  USERGETLIST_SUCCESS,
  USERGETLIST_FAIL,
  DELETEUSER_REQUEST,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAIL,
  UPDATEUSER_REQUEST,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
} from "../../constant/CDPLC_ADMIN/CreateUserConstant";

const initialState = {
  user: null,
  error: null,
  data: null,
  msg: null,
};
export const getStafflist = (state = initialState, action) => {
  switch (action.type) {
    case USERGETLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USERGETLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case USERGETLIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const addUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
      };
    case USER_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
export const deleteUser = (state = initialState, action) => {
  switch (action.type) {
    case DELETEUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETEUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case DELETEUSER_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};
export const updateUser = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATEUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case UPDATEUSER_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};
