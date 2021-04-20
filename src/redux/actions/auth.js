import { setUserData, setIsSignUp, setIsLogin } from "../slices/auth";
import axios from "axios";
import { AUTH_URL } from "../../utils/Constants";
import { setApplicationError } from "../slices/application";

export const registerUser = (data, setLoading, setErrors, history) => async (
  dispatch
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${AUTH_URL}/register`, data);
    if (res) {
      console.log(res.data);
      setLoading(false);
      const {
        user: { name, email, id },
        token,
      } = res.data;
      const payload = {
        name,
        email,
        token,
      };
      dispatch(setIsSignUp(true));
      setAuthorization(token);
      dispatch(setUserData(payload));
      const resDS = await axios.get(`${AUTH_URL}/docusign/requestAuth/${id}`);
      if (resDS) {
        window.open(resDS.data.ds_redirect);
      }
    }
  } catch (err) {
    if (err) {
      setErrors(err.response.data.error);
      setLoading(false);
    }
    console.log(err.response.data);
  }
};

export const loginUser = (data, setLoading, setErrors, rememberMe) => async (
  dispatch
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${AUTH_URL}/login?`, data);
    console.log(res.data);
    if (res) {
      setLoading(false);
      const {
        user: { name, email, id },
        token,
      } = res.data;
      const payload = {
        name,
        email,
        token,
      };
      if (rememberMe) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      setAuthorization(token);
      dispatch(setIsLogin(true));
      dispatch(setUserData(payload));
      let resDS;
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        resDS = await axios.get(
          `${AUTH_URL}/docusign/requestAuth/${id}?source=dev`
        );
      } else {
        resDS = await axios.get(`${AUTH_URL}/docusign/requestAuth/${id}`);
      }
      if (resDS) {
        window.open(resDS.data.ds_redirect);
      }
    }
  } catch (err) {
    if (err && err.response) {
      setErrors(err.response.data.error);
      setLoading(false);
    }
  }
};

export const resetPassword = (data, setLoading, setError, setSuccess) => async (
  dispatch
) => {
  try {
    console.log(data);
    setLoading(true);
    const res = await axios.post(`${AUTH_URL}/resetPassword`, data);
    if (res) {
      setSuccess(res.data.message);
      setLoading(false);
    }
  } catch (err) {
    if (err && err.response && err.response.data) {
      setError(err.response.data.message);
      setLoading(false);
    }
  }
};

export const createNewPassword = (data, setLoading, history) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.post(
      `${AUTH_URL}/createNewPassword`,
      { password: data.password },
      {
        headers: {
          "x-access-token": `${data.token}`,
        },
      }
    );
    if (res) {
      console.log(res.data);
    }
  } catch (err) {
    console.log(err);
    if (err && err.response) {
      dispatch(setApplicationError(err.response.data.error));
      setLoading(false);
    }
  }
};

export const getDSToken = (code, history) => async (dispatch) => {
  try {
    const res = await axios.get(`${AUTH_URL}/dsCallback/auth?code=${code}`);
    if (res) {
      const { ds_access_token, ds_refresh_token, ds_token_expire } = res.data;
      setDSToken(ds_access_token, ds_refresh_token, ds_token_expire);
      history.push("/applications");
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem("TaxToken");
  delete axios.defaults.headers.common["x-access-token"];
  setIsLogin(false);
  window.location.href = "/login";
};

export const setAuthorization = (token) => {
  const TaxToken = token;
  localStorage.setItem("TaxToken", TaxToken);
  axios.defaults.headers.common["x-access-token"] = TaxToken;
};

const setDSToken = (accessToken, refreshToken, expireToken) => {
  const AccessToken = accessToken;
  const RefreshToken = refreshToken;
  const ExpireToken = expireToken;
  localStorage.setItem("AccessToken", AccessToken);
  localStorage.setItem("RefreshToken", RefreshToken);
  localStorage.setItem("ExpireToken", ExpireToken);
};
