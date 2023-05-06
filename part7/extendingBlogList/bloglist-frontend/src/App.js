/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import Header from "./components/Header";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { initaliseBlogs } from "./reducers/blogReducer";
import { intialiseUsers } from "./reducers/usersReducer";
import { login } from "./reducers/loginReducer";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const reduxLogin = useSelector((state) => state.login);
  const blogFromRef = useRef();

  useEffect(() => {
    dispatch(initaliseBlogs());
    dispatch(intialiseUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);

  if (!reduxLogin) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <Header />
      <Toggleable buttonLabel="new blog" ref={blogFromRef}>
        <BlogForm toggleRef={blogFromRef} />
      </Toggleable>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
