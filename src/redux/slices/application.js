import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  application: {},
  isLoading: false,
  isAppLoading: false,
  status: false,
  error: "",
  success: "",
};

const application = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    getAllApplication: (state, action) => {
      state.isAppLoading = false;
      state.isLoading = false;
      state.error = "";
      state.application = {};
      state.applications = action.payload;
      return state;
    },
    getApplication: (state, action) => {
      state.isAppLoading = false;
      state.isLoading = false;
      state.error = "";
      state.application = action.payload;
      return state;
    },
    getUpdatedStatus: (state, action) => {
      state.isAppLoading = false;
      state.isLoading = false;
      state.error = "";
      let index = state.applications.findIndex(
        (app) => app.id === action.payload.id
      );
      state.applications[index] = action.payload;
      return state;
    },
    setApplicationLoading: (state, action) => {
      state.isLoading = true;
      return state;
    },
    setAppLoading: (state, action) => {
      state.isAppLoading = true;
      return state;
    },
    setApplicationError: (state, action) => {
      state.isAppLoading = false;
      state.isLoading = false;
      state.error = action.payload;
      return state;
    },
    setApplicationSuccess: (state, action) => {
      state.isAppLoading = false;
      state.isLoading = false;
      state.success = action.payload;
      return state;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      return state;
    },
    resUpdateUserStatus: (state, action) => {
      const clonedApplications = JSON.parse(JSON.stringify(state.applications))

      const updatedDataIndex = clonedApplications.findIndex(item => {
        return item.id === action.payload.id
      })

      clonedApplications.splice(updatedDataIndex, 1, action.payload)

      state = {
        ...state,
        applications: clonedApplications
      }
      return state
    }
  },
});

export const {
  setApplicationError,
  setApplicationLoading,
  getAllApplication,
  getApplication,
  getUpdatedStatus,
  setStatus,
  setAppLoading,
  setApplicationSuccess,
  resUpdateUserStatus
} = application.actions;

export default application.reducer;
