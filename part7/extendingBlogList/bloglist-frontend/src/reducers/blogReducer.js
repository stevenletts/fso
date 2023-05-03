import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { settingNotification } from "./reducers/notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlogAction } = blogSlice.actions;

export const initaliseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (Blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(Blog);
    dispatch(addBlogAction(newBlog));
    dispatch(
      settingNotification(
        {
          message: `${newBlog.title} by ${newBlog.author} has been added`,
          type: "added",
        },
        5
      )
    );
  };
};

export default blogSlice.reducer;
