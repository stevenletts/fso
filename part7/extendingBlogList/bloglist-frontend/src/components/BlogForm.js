import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFromRef }) => {
  const [newTitle, setTitle] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newURL, setURL] = useState("");

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setURL(event.target.value);
  };

  const addingBlog = (event) => {
    event.preventDefault();
    blogFromRef.current.toggleVisibility();
    dispatch(
      addBlog({
        title: newTitle,
        author: newAuthor,
        url: newURL,
      })
    );
    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <div>
      <form onSubmit={addingBlog}>
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
