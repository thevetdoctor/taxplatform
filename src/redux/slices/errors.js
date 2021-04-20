import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: []
};

const errors = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
      return state;
    }
  },
});

export const { setErrors } = errors.actions;

export default errors.reducer;
