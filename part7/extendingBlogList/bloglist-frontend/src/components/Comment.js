import { addCommentToBE } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Comment = ({ blog }) => {
  const [newComment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(addCommentToBE(blog, newComment));
    setComment("");
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          Comment:{" "}
          <input
            id="Comment"
            value={newComment}
            onChange={handleCommentChange}
          />{" "}
          <button type="submit">Submit</button>
        </div>
      </form>
      {blog.comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
    </div>
  );
};

export default Comment;
