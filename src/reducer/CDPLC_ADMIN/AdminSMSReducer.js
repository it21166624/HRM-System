// import {
//     SEND_SMS_REQUEST,
//     SEND_SMS_SUCCESS,
//     SEND_SMS_FAILURE,
//   } from "../../constant/CDPLC_ADMIN/AdminSMSConstant";
  
//   const initialState = {
//     loading: false,
//     error: null,
//   };
  
//   const AdminSMSReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SEND_SMS_REQUEST:
//         return { ...state, loading: true, error: null };
//       case SEND_SMS_SUCCESS:
//         return { ...state, loading: false };
//       case SEND_SMS_FAILURE:
//         return { ...state, loading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };
  
//   export default AdminSMSReducer;
  