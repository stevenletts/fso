import React from "react";
import { handleLogout } from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const loggedInUser = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const padding = {
    padding: 5,
  };

  const logout = (event) => {
    dispatch(handleLogout());
    navigate("/");
  };

  return (
    <div>
      <p>
        <Link to={"/"} style={padding}>
          home
        </Link>
        <Link to={"/users"} style={padding}>
          users
        </Link>
        logged in as {loggedInUser.name}
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </p>
    </div>
  );
};

export default Header;
