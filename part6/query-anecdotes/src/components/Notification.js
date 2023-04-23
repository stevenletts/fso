import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const value = useNotificationValue();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>{value}</div>;
};

export default Notification;
