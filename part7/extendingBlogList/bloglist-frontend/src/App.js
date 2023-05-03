import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { settingNotification } from "./reducers/notificationReducer";
import { initaliseBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  const reduxBlogs = useSelector((state) => state.blogs);

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initaliseBlogs());
  });

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
      dispatch(
        settingNotification({ message: "wrong credintials", type: "error" }),
        5
      );
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

//  const addBlog = (newBlog) => {
//     blogService.create(newBlog).then((newBlogReturned) => {
//       setBlogs(blogs.concat(newBlogReturned));

//       blogFromRef.current.toggleVisiblity();
//     });
//     dispatch(
//       settingNotification(
//         {
//           message: `${newBlog.title} by ${newBlog.author} has been added`,
//           type: "added",
//         },
//         5
//       )
//     );
//   }; 

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
      {[...reduxBlogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={blog.user.username}
            updateBlog={update}
            deleteBlog={deleter}
            canRemove={blog.user.username === user.username}
          />
        ))}
    </div>
  );
};

export default App;
