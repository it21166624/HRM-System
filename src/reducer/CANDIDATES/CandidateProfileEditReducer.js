import { LOGOUT_SUCCESS } from "../../constant/CANDIDATES/CandidateLoginConstant";
import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL ,
} from "../../constant/CANDIDATES/CandidateProfileEditConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
  profileEditdataDispatch: false,
};

export const editProfile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        profileEditdataDispatch: false,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
        profileEditdataDispatch: true,
      };
    case EDIT_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        profileEditdataDispatch: false,
      };
    default:
      return state;
  }
};

export const uploadUserImage = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        imageUploadSuccess: true,
      };
    case IMAGE_UPLOAD_FAIL:
      return {
        ...state,
        imageUploadSuccess: false,
      };
    default:
      return state;
  }
};