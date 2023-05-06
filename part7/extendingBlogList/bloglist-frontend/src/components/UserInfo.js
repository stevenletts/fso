import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((info) => info.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserInfo;
