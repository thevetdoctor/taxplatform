import {
  getAllApplication,
  setApplicationLoading,
  setApplicationError,
  getUpdatedStatus,
  setAppLoading,
  setApplicationSuccess,
} from "../index";
import axios from "axios";
import { BASE_URL } from "../../utils/Constants";
import { getApplication, resUpdateUserStatus } from "../slices/application";

export const getAllApplicationData = (data, history) => async (dispatch) => {
  dispatch(setAppLoading(true));
  try {
    const res = await axios.post(`${BASE_URL}`, data);
    if (res) {
      dispatch(setAppLoading(false));
      dispatch(setApplicationSuccess("Application created successfully!"));
      history.push("/applications");
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      dispatch(setApplicationError(err.response.data.error));
    } else {
      alert(`${JSON.stringify(err)}`);
      console.log(err);
      dispatch(setApplicationError("Check your connection.."));
    }
  }
};

export const getData = () => async (dispatch) => {
  dispatch(setApplicationLoading(true));
  try {
    const res = await axios.get(`${BASE_URL}`);
    if (res) {
      console.log({ res });
      const data = JSON.parse(JSON.stringify(res.data)).reverse();
      dispatch(getAllApplication(data));
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const getApplicationData = (id) => async (dispatch) => {
  try {
    dispatch(setApplicationLoading(true));
    const res = await axios.get(`${BASE_URL}/${id}`);
    if (res) {
      dispatch(getApplication(res.data));
      console.log(res.data);
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const updateApplication = (data, id, history) => async (dispatch) => {
  console.log(data);
  dispatch(setAppLoading(true));
  try {
    const res = await axios.post(`${BASE_URL}/${id}`, data);
    if (res) {
      dispatch(setAppLoading(false));
      dispatch(getUpdatedStatus(res.data));
      console.log(res.data);
      history.push("/applications");
      dispatch(setApplicationSuccess("Account updated successfully!"));
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      dispatch(setApplicationError(err.response.data.error));
    } else {
      alert(`${JSON.stringify(err)}`);
      console.log(err);
      dispatch(setApplicationError("Check your connection.."));
    }
  }
};

export const updateStatus = (id, data) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/${id}/updateStatus`, data, {
      headers: {
        "ds-access-token": localStorage.getItem("AccessToken"),
        "ds-refresh-token": localStorage.getItem("RefreshToken"),
        "ds-token-expire": localStorage.getItem("ExpireToken"),
      },
    });
    if (res) {
      dispatch(resUpdateUserStatus(res.data.Application));
      // dispatch(getUpdatedStatus(res.data));
      dispatch(setApplicationSuccess("Status updated successfully!"));
    }
  } catch (error) {
    if (error && error.response && error.response.data) {
      dispatch(setApplicationError(error.response.data.error));
      console.log(error.response.data);
    }
  }
};
