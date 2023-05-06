import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { settingNotification } from "./notificationReducer.js";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      console.log(action);
      return action.payload;
    },
    logout(state, action) {
      return action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const handleLogin = (credintials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: credintials.username,
        password: credintials.password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(login(user));
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(
        settingNotification(
          {
            message: "something went wrong try again",
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const handleLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedInUser");
    dispatch(logout(null));
  };
};

export default userSlice.reducer;
