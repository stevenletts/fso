import { useSelector } from "react-redux";
import User from "./User";
const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h2> Users </h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...users].map((user) => (
            <User
              username={user.username}
              key={user.id}
              id={user.id}
              blogs={user.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
