import {
  APPOINT_CAN_REQUEST,
  APPOINT_CAN_SUCCESS,
  APPOINT_CAN_FAIL,
} from "../../../src/constant/CDPLC_STAFF/StaffUpdateAppointmentStatusConstant";
import StaffAppointedJobServices from "../../serveices/CDPLC_STAFF/StaffAppointedJobServices";

export const StaffUpdateAppointmentStatus =
  (appointment_id) => async (dispatch) => {
    dispatch({
      type: APPOINT_CAN_REQUEST,
    });

    try {
      const response =
        await StaffAppointedJobServices.StaffUpdateAppointmentStatus(
          appointment_id
        );

      if (response.data.statusCode === 200) {
        dispatch({
          type: APPOINT_CAN_SUCCESS,
          payload: {
            data: response.data,
            appointment_id: appointment_id,
          },
        });
      } else {
        dispatch({
          type: APPOINT_CAN_FAIL,
          payload: {
            msg: "Failed to accept candidate.",
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
        type: APPOINT_CAN_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  };
