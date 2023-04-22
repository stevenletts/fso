import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const settingNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(setNotification("")), delay * 1000);
  };
};

export default notificationSlice.reducer;
