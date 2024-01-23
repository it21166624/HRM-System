// CandidateRegister.js
import {
  JobDates_REQUEST,
  JobDates_SUCCESS,
  JobDates_FAIL,
} from "../../constant/CDPLC_ADMIN/UpdatejobdateConstant";
import UpdatejobdateServices from "../../serveices/CDPLC_ADMIN/UpdatejobdateServices";
import { getHistory } from "../CDPLC_STAFF/StaffRequestHistory";

export const updateJobDates =
  (Job_id, Job_Start_Date, Job_End_Date) => async (dispatch) => {
    dispatch({
      type: JobDates_REQUEST,
    });

    try {
      const response = await UpdatejobdateServices.updateJobDates(
        Job_id,
        Job_Start_Date,
        Job_End_Date
      );
      if (response.data.statusCode === 200) {
        dispatch({
          type: JobDates_SUCCESS,
          payload: {
            data: response.resultSet,
          },
        });
        // dispatch(getHistory());
      } else {
        dispatch({
          type: JobDates_FAIL,
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
        type: JobDates_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  };
