import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  GET_DATA1_REQUEST,
  GET_DATA1_SUCCESS,
  GET_DATA1_FAIL,
  GET_DATA2_REQUEST,
  GET_DATA2_SUCCESS,
  GET_DATA2_FAIL,
  GET_DATA3_REQUEST,
  GET_DATA3_SUCCESS,
  GET_DATA3_FAIL,
  APPLY_JOB_FAIL,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
} from "../../constant/CANDIDATES/CandidateFromConstant";

const initialState = {
  msg: null,
  data: null,
};

export const ApplyJob = (state = { msg: null, data: null }, action) => {
  switch (action.type) {
    case APPLY_JOB_REQUEST:
      return {
        ...state,
      };
    case APPLY_JOB_SUCCESS:
      return {
        ...state,
        msg: null,
        data: action.payload.data,
      };
    case APPLY_JOB_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const getData = (state = { msg: null, data: null }, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        msg: null,
        data: action.payload.data,
      };
    case GET_DATA_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const getData1 = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA1_REQUEST:
      return {
        ...state,
      };
    case GET_DATA1_SUCCESS:
      return {
        ...state,
        msg: null,
        data1: action.payload.data1,
      };
    case GET_DATA1_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
export const getData2 = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA2_REQUEST:
      return {
        ...state,
      };
    case GET_DATA2_SUCCESS:
      return {
        ...state,
        msg: null,
        data1: action.payload.data1,
      };
    case GET_DATA2_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
export const getData3 = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA3_REQUEST:
      return {
        ...state,
      };
    case GET_DATA3_SUCCESS:
      return {
        ...state,
        msg: null,
        data1: action.payload.data1,
      };
    case GET_DATA3_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
