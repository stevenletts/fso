import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const addBlog = (newBlog) => {
    blogService.create(newBlog).then((newBlogReturned) => {
      setBlogs(blogs.concat(newBlogReturned));

      blogFromRef.current.toggleVisiblity();
    });
    setErrorMessage(`${newBlog.title} by ${newBlog.author} has been added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const update = async (newBlog) => {
    const updated = await blogService.update(newBlog);
    setBlogs(blogs.map((blog) => (blog.id === updated.id ? updated : blog)));
  };

  const deleter = async (deadBlog) => {
    await blogService.del(deadBlog);

    setBlogs(blogs.filter((blog) => blog.id !== deadBlog));
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={true} />
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
      <Notification message={errorMessage} type={false} />
      <p>
        logged in as {user.name}
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <h2>blogs</h2>
      <Toggleable buttonLabel="new blog" ref={blogFromRef}>
        <BlogForm addBlogToDB={addBlog} />
      </Toggleable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user.name}
            updateBlog={update}
            deleteBlog={deleter}
          />
        ))}
    </div>
  );
};

export default App;
