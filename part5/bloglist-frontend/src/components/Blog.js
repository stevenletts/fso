import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog, canRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLEft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <div className={"blog"} style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>View</button>
      </div>
    );
  }

  const update = () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updated);
  };

  const deleter = () => {
    if (window.confirm(`delete ${blog.title} ?`)) deleteBlog(blog.id);
  };

  // get request returns a populated blog with user objet attached but new blogs created when logged in return
  // a user id -> instead of 2 requests to users and blogs to return a joined response the logic infers that the
  // user logged in must have added the blog and the abscence a user name in the blog is corrected.
  const whoAdded = blog.user.name ? blog.user.name : user;

  return (
    <div className={"blog"} style={blogStyle}>
      <p>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(false)}>Hide</button>
      </p>{" "}
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button onClick={update}>like</button>
      </p>
      <p>{whoAdded}</p>
      {canRemove ? <button onClick={deleter}>delete</button> : null}
    </div>
  );
};

export default Blog;
