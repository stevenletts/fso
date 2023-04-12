import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
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
      setErrorMessage("wrong credintials");
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
    });
    setErrorMessage(`${newBlog.title} by ${newBlog.author} has been added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type={true} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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
      <BlogForm addBlogToDB={addBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
