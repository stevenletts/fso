import { useDispatch, useSelector } from "react-redux";
import { updateBlog, delBlog } from "../reducers/blogReducer";
import { useParams, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const loggedInUser = useSelector((state) => state.login.name);
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const update = () => {
    // vote function that updates the blog and then dispatches it to the reducer that updates the server and the redux state
    const updated = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(updated));
  };

  const deleter = () => {
    if (window.confirm(`delStatenotificationte ${blog.title} ?`)) {
      dispatch(delBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} <button onClick={update}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {loggedInUser === blog.user.name ? (
        <button onClick={deleter}>delete</button>
      ) : null}
      <div>
        <h2>Comments</h2>
      </div>
      <Comment blog={blog} />
    </div>
  );
};

export default Blog;
