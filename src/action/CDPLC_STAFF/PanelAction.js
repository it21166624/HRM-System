import {
  GETPANEL_REQUEST,
  GETPANEL_SUCCESS,
  GETPANEL_FAIL,
  PUTPANEL_REQUEST,
  PUTPANEL_SUCCESS,
  PUTPANEL_FAIL,
  DELETEPANEL_REQUEST,
  DELETEPANEL_SUCCESS,
  DELETEPANEL_FAIL,
} from "../../constant/CDPLC_STAFF/PanelConstant";

import PanelServices from "../../serveices/CDPLC_STAFF/PanelServices";

export const getPanellist = () => async (dispatch) => {
  dispatch({
    type: GETPANEL_REQUEST,
  });

  try {
    const data = await PanelServices.getPanellist();

    if (data.data.statusCode === 200) {
      dispatch({
        type: GETPANEL_SUCCESS,
        payload: {
          data: data.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: GETPANEL_FAIL,
        payload: {
          msg: "Failed to load leave balance",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GETPANEL_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const UpdateInterviewPanel = (data) => async (dispatch) => {
  dispatch({
    type: PUTPANEL_REQUEST,
  });

  try {
    const response = await PanelServices.UpdateInterviewPanel(
      data.PanelId,
      data.PanelName,
      data.Interviewer1,
      data.Interviewer2,
      data.Interviewer3,
      data.Interviewer4
    );

    if (response.statusCode === 200) {
      dispatch({
        type: PUTPANEL_SUCCESS,
        payload: {
          data: response.resultSet,
          user: "test",
        },
      });
      // dispatch(getHistory());
    } else {
      dispatch({
        type: PUTPANEL_FAIL,
        payload: {
          msg: "Failed date update ",
        },
      });
    }
    return Promise.resolve();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: PUTPANEL_FAIL,
      payload: {
        msg: message,
      },
    });
    return Promise.reject();
  }
};

export const DeleteInterviewPanel = (id) => async (dispatch) => {
  dispatch({
    type: DELETEPANEL_REQUEST,
  });

  try {
    const response = await PanelServices.DeleteInterviewPanel(id);

    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETEPANEL_SUCCESS,
        payload: {
          msg: "Job details updated successfully",
        },
      });
    } else {
      dispatch({
        type: DELETEPANEL_FAIL,
        payload: {
          msg: "Failed to update job details",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: DELETEPANEL_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
