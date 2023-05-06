import React from "react";
import { handleLogout } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = (event) => {
    dispatch(handleLogout());
  };

  return (
    <div>
      <p>
        logged in as {user.name}
        <button type="submit" onClick={logout}>
          Logout
        </button>
      </p>
      <h2>blogs</h2>
    </div>
  );
};

export default Header;
