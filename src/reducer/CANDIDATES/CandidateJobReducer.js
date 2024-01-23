import {
  GET_ALL_JOB_FAIL,
  GET_ALL_JOB_REQUEST,
  GET_ALL_JOB_SUCCESS,
  GET_APPLIED_JOB_FAIL,
  GET_APPLIED_JOB_REQUEST,
  GET_APPLIED_JOB_SUCCESS,
} from "../../constant/CANDIDATES/CandidateJobConstant";

const initialState = {
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const GetAppliedJobsHistory = (state = initialState, action) => {
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
      };
    default:
      return state;
  }
};

export const AdminGetAllJobs = (
  state = { user: null, error: null, data: [], msg: null, loading: false },
  action
) => {
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
