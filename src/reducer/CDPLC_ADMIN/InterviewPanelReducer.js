import {
  CREATE_INTERVIEW_FAIL,
  CREATE_INTERVIEW_REQUEST,
  CREATE_INTERVIEW_SUCCESS,
  GET_INTERVIEW_PANEL_LIST_FAIL,
  GET_INTERVIEW_PANEL_LIST_REQUEST,
  GET_INTERVIEW_PANEL_LIST_SUCCESS,
  CREATE_APPOINMENT_REQUEST,
  CREATE_APPOINMENT_SUCCESS,
  CREATE_APPOINMENT_FAIL,
} from "../../constant/CDPLC_ADMIN/InterviewPanelConstant";

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

export const CreateInterview = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_INTERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_INTERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case CREATE_INTERVIEW_FAIL:
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

export const CreateAppointment = (
  state = { error: null, Data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_APPOINMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_APPOINMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        Data: action.payload.data,
      };
    case CREATE_APPOINMENT_FAIL:
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
