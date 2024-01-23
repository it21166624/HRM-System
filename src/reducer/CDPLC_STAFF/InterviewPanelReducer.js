import {
  CREATE_INTERVIEW_PANEL_FAIL,
  CREATE_INTERVIEW_PANEL_REQUEST,
  CREATE_INTERVIEW_PANEL_SUCCESS,
  GET_INTERVIEW_LIST_FAIL,
  GET_INTERVIEW_LIST_REQUEST,
  GET_INTERVIEW_LIST_SUCCESS,
  GET_INTERVIEW_PANEL_LIST_FAIL,
  GET_INTERVIEW_PANEL_LIST_REQUEST,
  GET_INTERVIEW_PANEL_LIST_SUCCESS,
  UPDATE_FINAL_INTERVIEW_FAIL,
  UPDATE_FINAL_INTERVIEW_REQUEST,
  UPDATE_FINAL_INTERVIEW_SUCCESS,
  UPDATE_INTERVIEW_FAIL,
  UPDATE_INTERVIEW_REQUEST,
  UPDATE_INTERVIEW_SUCCESS,
  GET_APPOINT_LIST_FAIL,
  GET_APPOINT_LIST_REQUEST,
  GET_APPOINT_LIST_SUCCESS,
} from "../../constant/CDPLC_STAFF/InterviewPanelConstant";

export const UpdateInterviewFinalStatus = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case UPDATE_FINAL_INTERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FINAL_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case UPDATE_FINAL_INTERVIEW_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        Data: [],
      };
    default:
      return state;
  }
};

export const GetInterviewPanelDetails = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_INTERVIEW_PANEL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INTERVIEW_PANEL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case GET_INTERVIEW_PANEL_LIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        Data: [],
      };
    default:
      return state;
  }
};

export const CreateInterviewPanel = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_INTERVIEW_PANEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_INTERVIEW_PANEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case CREATE_INTERVIEW_PANEL_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        Data: [],
      };
    default:
      return state;
  }
};

export const GetInterviewList = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_INTERVIEW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INTERVIEW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case GET_INTERVIEW_LIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        Data: [],
      };
    default:
      return state;
  }
};

export const UpdateInterviewStatus = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case UPDATE_INTERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case UPDATE_INTERVIEW_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
        Data: [],
      };
    default:
      return state;
  }
};

export const getAppointCandidates = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_APPOINT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_APPOINT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case GET_APPOINT_LIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
