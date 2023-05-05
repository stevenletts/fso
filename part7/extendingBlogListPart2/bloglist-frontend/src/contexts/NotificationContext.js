import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "added":
      return { className: action.type, message: `you added ${action.payload}` };
    case "error":
      return { className: action.type, message: action.payload };
    case "CLEAR":
      return { className: "", message: "" };
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  const [user, userDispatch] = useReducer(userReducer, "");
  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, user, userDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext();
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext();
  return notificationAndDispatch[1];
};

export const useUserValue = () => {
  const userAndDispatch = useContext();
  return userAndDispatch[3];
};
export const useUserDispatch = () => {
  const userAndDispatch = useContext();
  return userAndDispatch[4];
};

export default NotificationContext;
