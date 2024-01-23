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

import InterviewPanelServices from "../../serveices/CDPLC_ADMIN/InterviewPanelServices";

export const GetInterviewPanelDetails = () => async (dispatch) => {
  dispatch({
    type: GET_INTERVIEW_PANEL_LIST_REQUEST,
  });

  return await InterviewPanelServices.GetInterviewPanelDetails().then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: GET_INTERVIEW_PANEL_LIST_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: GET_INTERVIEW_PANEL_LIST_FAIL,
          payload: {
            msg: "Failed to load leave balance",
          },
        });
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_INTERVIEW_PANEL_LIST_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const CreateInterview = (requestData) => async (dispatch) => {
  dispatch({
    type: CREATE_INTERVIEW_REQUEST,
  });

  return await InterviewPanelServices.CreateInterview(requestData).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: CREATE_INTERVIEW_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: CREATE_INTERVIEW_FAIL,
          payload: {
            msg: "Failed to load leave balance",
          },
        });
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CREATE_INTERVIEW_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const CreateAppointment = (requestData) => async (dispatch) => {
  dispatch({
    type: CREATE_APPOINMENT_REQUEST,
  });

  return await InterviewPanelServices.CreateAppointment(requestData).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: CREATE_APPOINMENT_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: CREATE_APPOINMENT_FAIL,
          payload: {
            msg: "Failed to load appoinment details",
          },
        });
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CREATE_APPOINMENT_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};
