import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USERGETLIST_REQUEST,
  USERGETLIST_SUCCESS,
  USERGETLIST_FAIL,
  DELETEUSER_REQUEST,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAIL,
  UPDATEUSER_REQUEST,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
} from "../../constant/CDPLC_ADMIN/CreateUserConstant";

import UserCreateServices from "../../serveices/CDPLC_ADMIN/UserCreateServices";

export const getStafflist = () => async (dispatch) => {
  dispatch({
    type: USERGETLIST_REQUEST,
  });

  try {
    const data = await UserCreateServices.getStafflist();

    if (data.data.statusCode === 200) {
      dispatch({
        type: USERGETLIST_SUCCESS,
        payload: {
          data: data.data.resultSet,
        },
      });
    } else {
      dispatch({
        type: USERGETLIST_FAIL,
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
      type: USERGETLIST_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const addUser = (userCredentials) => async (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  try {
    const response = await UserCreateServices.addUser(userCredentials);

    if (response.statusCode === 200) {
      dispatch({
        type: USER_SUCCESS,
        payload: {
          data: response.data,
        },
      });
    } else {
      dispatch({
        type: USER_FAIL,
        payload: {
          msg: "Failed to add user",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: USER_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({
    type: DELETEUSER_REQUEST,
  });

  try {
    const response = await UserCreateServices.deleteUser(id);

    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETEUSER_SUCCESS,
        payload: {
          msg: "Job details updated successfully",
        },
      });
    } else {
      dispatch({
        type: DELETEUSER_FAIL,
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
      type: DELETEUSER_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const updateUser =
  (Reg_user_id, Section_Id, Email, Password) => async (dispatch) => {
    dispatch({
      type: UPDATEUSER_REQUEST,
    });

    try {
      const response = await UserCreateServices.updateUser(
        Reg_user_id,
        Section_Id,
        Email,
        Password
      );

      if (response.statusCode === 200) {
        dispatch({
          type: UPDATEUSER_SUCCESS,
          payload: {
            data: response.resultSet,
            user: "test",
          },
        });
        // dispatch(getHistory());
      } else {
        dispatch({
          type: UPDATEUSER_FAIL,
          payload: {
            msg: "Failed date update ",
          },
        });
      }
      return Promise.resolve();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: UPDATEUSER_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  };
