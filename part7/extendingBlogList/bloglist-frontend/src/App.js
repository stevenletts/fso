/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import Header from "./components/Header";
import blogService from "./services/blogs";
import { initaliseBlogs } from "./reducers/blogReducer";
import { login } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user);
  const blogFromRef = useRef();

  useEffect(() => {
    dispatch(initaliseBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(login(user));
      blogService.setToken(user.token);
    }
  }, []);

  if (!reduxUser) {
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
      <BlogList />
    </div>
  );
};

export default App;
