// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import taskStatusReducer from "./taskStatusSlice";

const store = configureStore({
  reducer: {
    tasks: taskStatusReducer,
  },
});

export default store;
