import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotificationDispatch } from "./contexts/NotificationContext";
import { useQuery } from "react-query";

const App = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFromRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setPassword("");
      setUsername("");
    } catch (exception) {
      dispatch({ type: "error", payload: "wrong credentials" });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const result = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading</div>;
  }

  if (result.isError) {
    return <div>error</div>;
  }

  const blogsQuery = result.data;

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleSubmit={handleLogin}
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
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <h2>blogs</h2>
      <Toggleable buttonLabel="new blog" ref={blogFromRef}>
        <BlogForm toggleRef={blogFromRef} />
      </Toggleable>
      {blogsQuery
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
