import { Link } from "react-router-dom";

const User = (props) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${props.id}`}>{props.username}</Link>
      </td>
      <td align="right">{props.blogs}</td>
    </tr>
  );
};

export default User;
