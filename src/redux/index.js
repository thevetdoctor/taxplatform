// Mess from old developer

import { setIsLogin, setIsSignUp, setUserData } from "./slices/auth";
import {
  logoutAdmin,
  registerUser,
  loginUser,
  getDSToken,
  createNewPassword,
  resetPasswordRequest,
} from "./actions/auth";

import {
  getAllApplication,
  getApplication,
  setApplicationError,
  setApplicationLoading,
  getUpdatedStatus,
  setStatus,
  setAppLoading,
  setApplicationSuccess,
  resUpdateUserStatus
} from "./slices/application";
import {
  getAllApplicationData,
  getData,
  getApplicationData,
  updateApplication,
  updateStatus,
} from "./actions/application";

export {
  setUserData,
  setIsSignUp,
  setIsLogin,
  getApplication,
  getAllApplication,
  getApplicationData,
  loginUser,
  logoutAdmin,
  registerUser,
  setApplicationError,
  setApplicationLoading,
  getAllApplicationData,
  getData,
  getDSToken,
  updateStatus,
  updateApplication,
  getUpdatedStatus,
  setStatus,
  setAppLoading,
  setApplicationSuccess,
  createNewPassword,
  resetPasswordRequest,
};
