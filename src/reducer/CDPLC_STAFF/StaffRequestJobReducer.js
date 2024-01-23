import {
    REQUESTJOB_REQUEST,
    REQUESTJOB_SUCCESS,
    REQUESTJOB_FAIL,
  } from "../../constant/CDPLC_STAFF/StaffRequestJobConstant";
  
  const initialState = {
    user: null,
    error: null,
    data: null,
    msg: null,
  };
  
  export const requestJob= (state = initialState, action) => {
    switch (action.type) {
      case REQUESTJOB_REQUEST:
        return {
          ...state,
        };
      case REQUESTJOB_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          msg: null,
          data: action.payload.data,
        };
      case REQUESTJOB_FAIL:
        return {
          ...state,
          msg: action.payload.msg,
        };
      default:
        return state;
    }
  };
  