import {
  GETPANEL_REQUEST,
  GETPANEL_SUCCESS,
  GETPANEL_FAIL,
  PUTPANEL_REQUEST,
  PUTPANEL_SUCCESS,
  PUTPANEL_FAIL,
  DELETEPANEL_REQUEST,
  DELETEPANEL_SUCCESS,
  DELETEPANEL_FAIL,
} from "../../constant/CDPLC_STAFF/PanelConstant";

const initialState = {
  user: null,
  error: null,
  data: null,
  msg: null,
};
export const getPanellist = (state = initialState, action) => {
  switch (action.type) {
    case GETPANEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GETPANEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case GETPANEL_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const UpdateInterviewPanel = (state = initialState, action) => {
  switch (action.type) {
    case PUTPANEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PUTPANEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case PUTPANEL_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};

export const DeleteInterviewPanel = (state = initialState, action) => {
  switch (action.type) {
    case DELETEPANEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETEPANEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
      };
    case DELETEPANEL_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };

    default:
      return state;
  }
};
//   export const addUser = (state = initialState, action) => {
//     switch (action.type) {
//       case USER_REQUEST:
//         return {
//           ...state,
//         };
//       case USER_SUCCESS:
//         return {
//           ...state,
//           user: action.payload.user,
//           msg: null,
//           data: action.payload.data,
//         };
//       case USER_FAIL:
//         return {
//           ...state,
//           msg: action.payload.msg,
//         };
//       default:
//         return state;
//     }
//   };
//   export const deleteUser = (state = initialState, action) => {
//     switch (action.type) {
//       case DELETEUSER_REQUEST:
//         return {
//           ...state,
//           loading: true,
//         };
//       case DELETEUSER_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           msg: action.payload.msg,
//         };
//       case DELETEUSER_FAIL:
//         return {
//           ...state,
//           msg: action.payload.msg,
//         };

//       default:
//         return state;
//     }
//   };
