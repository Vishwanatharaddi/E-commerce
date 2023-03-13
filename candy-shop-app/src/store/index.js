import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import expense from "./expense";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expense,
  },
});

export default store;
