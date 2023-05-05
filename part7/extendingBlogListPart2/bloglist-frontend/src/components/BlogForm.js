import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../contexts/NotificationContext";
import blogService from "../services/blogs";

const BlogForm = ({ toggleRef }) => {
  const [newTitle, setTitle] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newURL, setURL] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setURL(event.target.value);
  };

  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
      dispatch({ type: "added", payload: newBlog.title });
      setTimeout(() => dispatch({ type: "CLEAR" }));
    },
    onError: (error) => {
      dispatch({ type: "error", payload: error.response.data.error });
    },
  });

  const addBlog = (event) => {
    event.preventDefault();
    toggleRef.current.toggleVisiblity();
    newBlogMutation.mutate({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input id="Title" value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author:{" "}
          <input id="Author" value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          URL: <input id="url" value={newURL} onChange={handleUrlChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
