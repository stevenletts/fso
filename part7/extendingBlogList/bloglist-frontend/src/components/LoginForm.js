import { useState } from "react";
import { handleLogin } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <Form
      onSubmit={formLogin}
      className="d-flex align-items-center justify-items-center flex-column"
    >
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="w-50 mb-3"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-50 mb-3"
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" className="p-10">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
