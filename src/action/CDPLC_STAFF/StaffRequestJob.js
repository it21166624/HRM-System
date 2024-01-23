// CandidateRegister.js
import {
    REQUESTJOB_REQUEST,
    REQUESTJOB_SUCCESS,
    REQUESTJOB_FAIL,
  } from "../../constant/CDPLC_STAFF/StaffRequestJobConstant";
  
  import StaffRequestJobServices from "../../serveices/CDPLC_STAFF/StaffRequestJobServices";
  
  export const requestJobJob = () => async (dispatch) => {
    dispatch({
      type: REQUESTJOB_REQUEST,
    });
  
    return await StaffRequestJobServices.requestJob().then(
      (data) => {
        if (data.data.statusCode === 200) {
          dispatch({
            type: REQUESTJOB_SUCCESS,
            payload: {
              data: data.data.resultSet,
            },
          });
        } else {
          dispatch({
            type: REQUESTJOB_FAIL,
            payload: {
              msg: "Failed to add job",
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
          type: REQUESTJOB_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
    return Promise.resolve();
  };
  