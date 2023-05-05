import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const value = useNotificationValue();
  return <div className={value.className}>{value.message}</div>;
};

export default Notification;
