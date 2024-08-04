// store.js
import { configureStore } from "@reduxjs/toolkit";
import insuranceReducer from "./state/insuranceSlice";

const store = configureStore({
  reducer: {
    insurance: insuranceReducer,
  },
});

export default store;
