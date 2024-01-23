// CandidateRegister.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../../constant/CANDIDATES/CandidateLoginConstant";

import CandidateGoogleLoginServices from "../../serveices/CANDIDATES/CandidateGoogleLoginServices";
import { getProfile } from "./CandidateProfile";
import { GetUserType } from "./CandidateLogin";
export const getGoogleLogin =
  (navigate, requestBodyData) => async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const response = await CandidateGoogleLoginServices.getGoogleLogin(
        requestBodyData
      );
      console.log(response.AuthKey);
      if (response.StatusCode === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: response.resultSet,
          },
        });

        localStorage.setItem("cdl_hrm_token", JSON.stringify(response.AuthKey));
        axios.defaults.headers.common["auth-key"] = response.AuthKey;
        dispatch(GetUserType(navigate));
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            msg: "Failed to register",
          },
        });
      }
    } catch (error) {
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
    }
  };
