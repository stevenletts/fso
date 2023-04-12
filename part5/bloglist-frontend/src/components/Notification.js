const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  if (type) {
    return <div className="error">{message}</div>;
  }

  return <div className="added">{message}</div>;
};

export default Notification;
