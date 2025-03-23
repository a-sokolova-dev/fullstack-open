const Notification = ({ message, type = "success" }) => {
  if (message === null) {
    return null;
  }

  let notificationType = type === "success" ? "success" : "error";

  return <div className={notificationType}>{message}</div>;
};

export default Notification;
