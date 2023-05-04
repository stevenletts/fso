import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { settingNotification } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlogToState(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
    deleteBlog(state, action) {
      console.log(action);
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlogToState, likeBlog, deleteBlog } =
  blogSlice.actions;

export const initaliseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (Blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(Blog);
    dispatch(addBlogToState(newBlog));
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

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(likeBlog(updatedBlog));
  };
};

export const delBlog = (blog) => {
  return async (dispatch) => {
    await blogService.del(blog);
    dispatch(deleteBlog(blog));
  };
};

export default blogSlice.reducer;
