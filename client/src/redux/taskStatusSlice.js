// src/redux/taskStatusSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hld: false,
  lld: false,
  diagrams: false,
  systemArchitecture: false,
  apis: false,
  documentation: false,
};

const taskStatusSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    markTaskCompleted: (state, action) => {
      const task = action.payload;
      state[task] = true;
    },
    resetAllTasks: () => initialState,
  },
});

export const { markTaskCompleted, resetAllTasks } = taskStatusSlice.actions;

export default taskStatusSlice.reducer;
