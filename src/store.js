import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { LOGOUT_SUCCESS } from "./constant/CANDIDATES/CandidateLoginConstant";
import {
  AdminGetAllJobs,
  GetAppliedJobsHistory,
} from "./reducer/CANDIDATES/CandidateJobReducer";
import { getLogin, UserType } from "./reducer/CANDIDATES/CandidateLoginReducer";
import { editProfile } from "./reducer/CANDIDATES/CandidateProfileEditReducer";
import { getProfile } from "./reducer/CANDIDATES/CandidateProfileReducer";
import { getRegister } from "./reducer/CANDIDATES/CandidateRegisterReducer";
import { getSummery } from "./reducer/CANDIDATES/CandidateSummeryReducer";
import CandidateSMSReducer, {
  candidateSMSReducer,
} from "./reducer/CANDIDATES/CandidateSMSReducer";

import {
  getCANLIST,
  SortJob,
} from "./reducer/CDPLC_ADMIN/GetCandidatelistReducer";

import { ApplyJob, getData } from "./reducer/CANDIDATES/CandidateFromReducer";

import { uploadUserImage } from "./reducer/CANDIDATES/CandidateProfileEditReducer";

import {
  getDeleteData1,
  getDeleteData2,
  getDeleteData3,
} from "./reducer/CANDIDATES/CandidateDeleteAddfieldReducer";
import {
  AcceptJobs,
  AdminGetJobDetails,
  AdminGetsectionsList,
  GetAllJobs,
  GetAppliedJobs,
  GetAppliedJobsDetails,
} from "./reducer/CDPLC_ADMIN/AdminReducer";

import {
  GetAppliedJobsUserList,
  GetPassUserList,
} from "./reducer/CDPLC_ADMIN/SelCandidatelistReducer";

import { updateJobDates } from "./reducer/CDPLC_ADMIN/UpdatejobdateReducer";

import {
  addUser,
  deleteUser,
  getStafflist,
  updateUser,
} from "./reducer/CDPLC_ADMIN/UserCreateReducer";

import {
  addJob,
  GetsectionsList,
  StaffGetEmployeeSummary,
} from "./reducer/CDPLC_STAFF/StaffAddJobReducer";

import {
  StaffGetAppliedJobsUserList,
  StaffSortJob,
} from "./reducer/CDPLC_STAFF/StaffApprovedListReducer";

import {
  getHistory,
  updateJobStatusDetails,
} from "./reducer/CDPLC_STAFF/StaffRequestHistoryReducer";

import message from "./reducer/message";

import {
  CreateInterviewPanel,
  GetInterviewList,
  UpdateInterviewStatus,
  UpdateInterviewFinalStatus,
  getAppointCandidates,
} from "./reducer/CDPLC_STAFF/InterviewPanelReducer";

import {
  GetInterviewPanelDetails,
  CreateInterview,
  CreateAppointment,
} from "./reducer/CDPLC_ADMIN/InterviewPanelReducer";
import { StaffUpdateAppointmentStatus } from "./reducer/CDPLC_STAFF/StaffUpdateAppointmentStatusReducer";
import AdminSMSReducer from "./reducer/CDPLC_ADMIN/AdminSMSReducer";
import StaffSMSReducer from "./reducer/CDPLC_STAFF/StaffSMSReducer";

import {
  getPanellist,
  UpdateInterviewPanel,
  DeleteInterviewPanel,
} from "./reducer/CDPLC_STAFF/PanelReducer";
import { AdminDashboardReducer } from "./reducer/CDPLC_ADMIN/AdminDashboardReducer";
import { StaffDashboardReducer } from "./reducer/CDPLC_STAFF/StaffDashboardReducer";

const appReducer = combineReducers({
  message: message,
  auth: getLogin,
  userType: UserType,
  register: getRegister,
  profile: getProfile,
  summery: getSummery,
  editprofile: editProfile,
  addJob: addJob,
  getHistory: getHistory,
  getCANLIST: getCANLIST,
  SortJob: SortJob,
  GetAppliedJobsUserList: GetAppliedJobsUserList,
  StaffGetAppliedJobsUserList: StaffGetAppliedJobsUserList,
  updateJobStatusDetails: updateJobStatusDetails,
  uploadUserImage: uploadUserImage,
  addUser: addUser,
  acceptJobs: AcceptJobs,
  getAllJobs: GetAllJobs,
  getAppliedJobs: GetAppliedJobs,
  updateJobDates: updateJobDates,
  applyJob: ApplyJob,
  getsectionsList: GetsectionsList,
  getStafflist: getStafflist,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAppliedJobsHistory: GetAppliedJobsHistory,
  getAppliedJobsDetails: GetAppliedJobsDetails,
  bioData: getData,
  adminGetAllJobs: AdminGetAllJobs,
  adminGetsectionsList: AdminGetsectionsList,
  adminGetJobDetails: AdminGetJobDetails,
  staffSortJob: StaffSortJob,
  staffGetEmployeeSummary: StaffGetEmployeeSummary,
  deleteHedu: getDeleteData1,
  deleteEmp: getDeleteData2,
  deleteProfe: getDeleteData3,
  CreateInterview: CreateInterview,
  CreateInterviewPanel: CreateInterviewPanel,
  GetInterviewList: GetInterviewList,
  UpdateInterviewStatus: UpdateInterviewStatus,
  GetInterviewPanelDetails: GetInterviewPanelDetails,
  UpdateInterviewFinalStatus: UpdateInterviewFinalStatus,
  StaffUpdateAppointmentStatus: StaffUpdateAppointmentStatus,
  CreateAppointment: CreateAppointment,
  GetPassUserList: GetPassUserList,
  getAppointCandidates: getAppointCandidates,
  SMSReducer: CandidateSMSReducer,
  AdminSMSReducer: AdminSMSReducer,
  StaffSMSReducer: StaffSMSReducer,
  getPanellist: getPanellist,
  UpdateInterviewPanel: UpdateInterviewPanel,
  DeleteInterviewPanel: DeleteInterviewPanel,
  AdminDashboardReducer: AdminDashboardReducer,
  StaffDashboardReducer: StaffDashboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
