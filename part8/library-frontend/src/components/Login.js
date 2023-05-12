import { useState, useEffect } from "react";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("loggedInUser", token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setPassword("");
    setUsername("");
  };

  if (!props.show) return null;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          ></input>
        </div>
        <div>
          password:
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
