import { useState } from "react";
import { handleLogin } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const dispatch = useDispatch();

  const formLogin = (event) => {
    event.preventDefault();
    dispatch(handleLogin({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={formLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
