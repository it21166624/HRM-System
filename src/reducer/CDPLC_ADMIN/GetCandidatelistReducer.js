import {
  CANLIST_REQUEST,
  CANLIST_SUCCESS,
  CANLIST_FAIL,
  ADMSELECT_REQUEST,
  ADMSELECT_SUCCESS,
  ADMSELECT_FAIL,
} from "../../constant/CDPLC_ADMIN/GetCandidatelistConstant";



export const getCANLIST = (
  state = { user: null, error: null, data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case CANLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CANLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case CANLIST_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export const SortJob = (
  state = { user: null, error: null, data: [], msg: null, loading: false },
  action
) => {
  switch (action.type) {
    case ADMSELECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMSELECT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: null,
        data: action.payload.data,
      };
    case ADMSELECT_FAIL:
      return {
        ...state,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};
