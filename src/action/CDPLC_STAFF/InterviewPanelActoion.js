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
  UPDATE_INTERVIEW_FAIL,
  UPDATE_INTERVIEW_REQUEST,
  UPDATE_INTERVIEW_SUCCESS,
  UPDATE_FINAL_INTERVIEW_FAIL,
  UPDATE_FINAL_INTERVIEW_REQUEST,
  UPDATE_FINAL_INTERVIEW_SUCCESS,
  GET_APPOINT_LIST_FAIL,
  GET_APPOINT_LIST_REQUEST,
  GET_APPOINT_LIST_SUCCESS,
} from "../../constant/CDPLC_STAFF/InterviewPanelConstant";

import InterviewPanelServices from "../../serveices/CDPLC_STAFF/InterviewPanelServices";

export const UpdateInterviewFinalStatus = (requestData) => async (dispatch) => {
  dispatch({
    type: UPDATE_FINAL_INTERVIEW_REQUEST,
  });

  return await InterviewPanelServices.UpdateInterviewFinalStatus(
    requestData
  ).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: UPDATE_FINAL_INTERVIEW_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: UPDATE_FINAL_INTERVIEW_FAIL,
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
        type: UPDATE_FINAL_INTERVIEW_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

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

export const UpdateInterviewStatus = (requestData) => async (dispatch) => {
  dispatch({
    type: UPDATE_INTERVIEW_REQUEST,
  });

  return await InterviewPanelServices.UpdateInterviewStatus(requestData).then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: UPDATE_INTERVIEW_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: UPDATE_INTERVIEW_FAIL,
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
        type: UPDATE_INTERVIEW_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const GetInterviewList = () => async (dispatch) => {
  dispatch({
    type: GET_INTERVIEW_LIST_REQUEST,
  });

  return await InterviewPanelServices.GetInterviewList().then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: GET_INTERVIEW_LIST_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: GET_INTERVIEW_LIST_FAIL,
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
        type: GET_INTERVIEW_LIST_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const CreateInterviewPanel = (requestData) => async (dispatch) => {
  dispatch({
    type: CREATE_INTERVIEW_PANEL_REQUEST,
  });

  return await InterviewPanelServices.CreateInterviewPanel(requestData).then(
    (data) => {
      console.log(data);
      if (data.data.statusCode === 200) {
        dispatch({
          type: CREATE_INTERVIEW_PANEL_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: CREATE_INTERVIEW_PANEL_FAIL,
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
        type: CREATE_INTERVIEW_PANEL_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};

export const getAppointCandidates = () => async (dispatch) => {
  dispatch({
    type: GET_APPOINT_LIST_REQUEST,
  });

  return await InterviewPanelServices.getAppointCandidates().then(
    (data) => {
      if (data.data.statusCode === 200) {
        dispatch({
          type: GET_APPOINT_LIST_SUCCESS,
          payload: {
            data: data.data.resultSet,
          },
        });
      } else {
        dispatch({
          type: GET_APPOINT_LIST_FAIL,
          payload: {
            msg: "Failed to load candidates",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_APPOINT_LIST_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
  return Promise.resolve();
};
