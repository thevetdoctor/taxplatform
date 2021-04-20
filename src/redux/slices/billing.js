import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  transactionHistory: [],
  activeSubscriptions: []
};

const billing = createSlice({
  name: "billing",
  initialState: initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      return state;
    },
    setTransactionHistory: (state, action) => {
      state.transactionHistory = action.payload;
      return state;
    },
    setActiveSubscriptions: (state, action) => {
      state.activeSubscriptions = action.payload;
      return state;
    }
  },
});

export const { setTransactions, setTransactionHistory, setActiveSubscriptions } = billing.actions;

export default billing.reducer;
