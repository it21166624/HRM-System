import {
  APPOINT_CAN_REQUEST,
  APPOINT_CAN_SUCCESS,
  APPOINT_CAN_FAIL,
} from "../../../src/constant/CDPLC_STAFF/StaffUpdateAppointmentStatusConstant";

const initialState = {
  user: null,
  error: null,
  data: [],
  msg: null,
  loading: false,
};

export const StaffUpdateAppointmentStatus = (state = initialState, action) => {
  switch (action.type) {
    case APPOINT_CAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPOINT_CAN_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case APPOINT_CAN_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};
