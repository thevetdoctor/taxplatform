import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import authReducer from "./slices/auth";
import applicationReducer from "./slices/application";
import billingReducer from "./slices/billing";
import errorsReducer from "./slices/errors";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  app: applicationReducer,
  billing: billingReducer,
  errors: errorsReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
