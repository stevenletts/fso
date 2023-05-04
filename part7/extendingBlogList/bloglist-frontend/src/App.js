/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import { initaliseBlogs } from "./reducers/blogReducer";
import { handleLogin, handleLogout } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const reduxBlogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initaliseBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(true);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFromRef = useRef();

  const login = (event) => {
    event.preventDefault();
    dispatch(handleLogin({ username, password }));
    setUsername("");
    setPassword("");
    setUser(true);
  };

  const logout = (event) => {
    event.preventDefault();
    dispatch(handleLogout());
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleSubmit={login}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <p>
        logged in as {user.name}
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </p>
      <h2>blogs</h2>
      <Toggleable buttonLabel="new blog" ref={blogFromRef}>
        <BlogForm toggleRef={blogFromRef} />
      </Toggleable>
      {[...reduxBlogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={blog.user.username}
            canRemove={blog.user.username === user.username}
          />
        ))}
    </div>
  );
};

export default App;
