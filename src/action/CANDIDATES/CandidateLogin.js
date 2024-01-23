import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USERTYPE_FAIL,
  USERTYPE_REQUEST,
  USERTYPE_SUCCESS,
} from "../../constant/CANDIDATES/CandidateLoginConstant";
import CandidateLoginServices from "../../serveices/CANDIDATES/CandidateLoginServices";
import { toast } from "react-toastify";
import { getProfile } from "./CandidateProfile";

export const login = (navigate, email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  return CandidateLoginServices.login(email, password).then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: data.data.resultSet,
          },
        });

        // const [reg_id, userType] = data.data.AuthKey
        //   ? data.data.resultSet.split("/")
        //   : ["", ""];
        localStorage.setItem("cdl_hrm_token", JSON.stringify(data.data.AuthKey));
        axios.defaults.headers.common["auth-key"] = data.data.AuthKey;
        dispatch(GetUserType(navigate));
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            msg: "Login Fail. Internal server error.",
          },
        });
        toast.error("Incorrect Email or password", {
          position: "top-right",
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
        type: LOGIN_FAIL,
        payload: {
          msg: message,
        },
      });
      toast.error("Incorrect Email or password", {
        position: "top-right",
      });
    }
  );
};

export const loadUser = (data, navigate) => async (dispatch) => {
  if (data) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        otp: null,
        user: data.serviceNo,
      },
    });
  }
};

export const logOut = (navigate) => async (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  navigate(`/`);
  window.location.reload();
};

export const GetUserType = (navigate) => async (dispatch) => {
  dispatch({
    type: USERTYPE_REQUEST,
  });
  return await CandidateLoginServices.GetUserType().then(
    (data) => {
      if (data.data.statusCode === 200) {
        localStorage.setItem("userType", JSON.stringify(data.data.result));
        dispatch({
          type: USERTYPE_SUCCESS,
          payload: {
            type: data.data.result,
          },
        });

        if (data.data.result === "C") {
          navigate("/dashboard");
        } else if (data.data.result === "S") {
          navigate("/staff_dashboard");
        } else if (data.data.result === "A") {
          console.log("sdfdf");
          navigate("/admin_dashboard");
        }
      } else {
        dispatch({
          type: USERTYPE_FAIL,
          payload: {
            msg: "Invalid User",
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
        type: USERTYPE_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  );
};
