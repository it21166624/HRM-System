import {
  GET_DATA1_Delete_REQUEST,
  GET_DATA1_Delete_SUCCESS,
  GET_DATA1_Delete_FAIL,
  GET_DATA2_Delete_REQUEST,
  GET_DATA2_Delete_SUCCESS,
  GET_DATA2_Delete_FAIL,
  GET_DATA3_Delete_REQUEST,
  GET_DATA3_Delete_SUCCESS,
  GET_DATA3_Delete_FAIL,
} from "../../constant/CANDIDATES/CandidateDeleteAddfieldConstant";

export const getDeleteData1 = (
  state = { msg: null, data: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_DATA1_Delete_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA1_Delete_SUCCESS:
      return {
        ...state,
        msg: null,
        data: action.payload.data,
        loading: false,
      };
    case GET_DATA1_Delete_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};
export const getDeleteData2 = (
  state = { msg: null, data: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_DATA2_Delete_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA2_Delete_SUCCESS:
      return {
        ...state,
        msg: null,
        data: action.payload.data,
        loading: false,
      };
    case GET_DATA2_Delete_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};
export const getDeleteData3 = (
  state = { msg: null, data: null, loading: false },
  action
) => {
  switch (action.type) {
    case GET_DATA3_Delete_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA3_Delete_SUCCESS:
      return {
        ...state,
        msg: null,
        data: action.payload.data,
        loading: false,
      };
    case GET_DATA3_Delete_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
        loading: false,
      };
    default:
      return state;
  }
};
