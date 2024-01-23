import {
  ACCEPT_JOB_FAIL,
  ACCEPT_JOB_REQUEST,
  ACCEPT_JOB_SUCCESS,
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_ALL_JOB_SUCCESS,
  GET_APPLIED_JOB_FAIL,
  GET_APPLIED_JOB_REQUEST,
  GET_APPLIED_JOB_SUCCESS,
  GET_APPLIED_JOB_DETAILS_FAIL,
  GET_APPLIED_JOB_DETAILS_REQUEST,
  GET_APPLIED_JOB_DETAILS_SUCCESS,
  GET_SECTION_REQUEST,
  GET_SECTION_SUCCESS,
  GET_SECTION_FAIL,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAIL,
} from "../../constant/CDPLC_ADMIN/AdminConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};
const initialState2 = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};
const initialState3 = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};
const initialState4 = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const AdminGetJobDetails = (
  state = {
    user: null,
    error: null,
    data: [],
    msg: null,
    loading: false,
    getHistory: false,
  },
  action
) => {
  switch (action.type) {
    case HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case HISTORY_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const AdminGetsectionsList = (
  state = { user: null, error: null, data: null, msg: null },
  action
) => {
  switch (action.type) {
    case GET_SECTION_REQUEST:
      return {
        ...state,
      };
    case GET_SECTION_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        msg: null,
        data: action.payload.data,
      };
    case GET_SECTION_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const GetAppliedJobsDetails = (state = initialState4, action) => {
  switch (action.type) {
    case GET_APPLIED_JOB_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_APPLIED_JOB_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GET_APPLIED_JOB_DETAILS_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};

export const GetAppliedJobs = (state = initialState3, action) => {
  switch (action.type) {
    case GET_APPLIED_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_APPLIED_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GET_APPLIED_JOB_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};

export const AcceptJobs = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCEPT_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case ACCEPT_JOB_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};

export const GetAllJobs = (state = initialState2, action) => {
  switch (action.type) {
    case GET_ALL_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GET_ALL_JOB_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
