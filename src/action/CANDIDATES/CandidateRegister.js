// CandidateRegister.js
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../../constant/CANDIDATES/CandidateRegisterConstant";

import CandidateRegisterServices from "../../serveices/CANDIDATES/CandidateRegisterServices";

export const getRegister =
  (notify, setLoading, navigate, requestBodyData) => async (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    try {
      const response = await CandidateRegisterServices.getRegister(
        requestBodyData
      );
      // console.log(response.Result);
      if (response.Result.statusCode === 200) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            data: response.Result.resultSet,
            user: "test",
          },
        });
        setLoading(true);
        setTimeout(() => {
          navigate(`/`);
          notify("Register successfull", "success");
        }, 5000);
      } else if (response.Result.statusCode === 500) {
        notify(response.Result.result, "error");
        dispatch({
          type: REGISTER_FAIL,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
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
        type: REGISTER_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  };
