// import {
//   SEND_SMS_REQUEST,
//   SEND_SMS_SUCCESS,
//   SEND_SMS_FAILURE,
// } from "../../constant/CANDIDATES/CandidateSMSConstants";
// import { AdminSMSService } from "../../serveices/CDPLC_ADMIN/AdminSMSService";

// export const AdminSMSAction = (mobileNo) => async (dispatch) => {
//   dispatch({
//     type: SEND_SMS_REQUEST,
//   });

//   try {
//     const response = await AdminSMSService(mobileNo);

//     if (response.statusCode === 200) {
//       dispatch({
//         type: SEND_SMS_SUCCESS,
//         payload: {
//           data: response.resultSet,
//           user: "test",
//         },
//       });
//     } else {
//       dispatch({
//         type: SEND_SMS_FAILURE,
//         payload: {
//           msg: "Failed to send SMS notification",
//         },
//       });
//     }
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     dispatch({
//       type: SEND_SMS_FAILURE,
//       payload: {
//         msg: message,
//       },
//     });
//   }
// };
