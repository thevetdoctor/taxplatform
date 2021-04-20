import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: null,
  email: "",
  isSignUp: false,
  isLogin: false,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, token, email } = action.payload;
      state.name = name;
      state.token = token;
      state.email = email
      return state;
    },
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload;
      return state;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
      return state;
    },
  },
});

export const {
  setUserData,
  setIsSignUp,
  setIsLogin,
} = auth.actions;

export default auth.reducer;
