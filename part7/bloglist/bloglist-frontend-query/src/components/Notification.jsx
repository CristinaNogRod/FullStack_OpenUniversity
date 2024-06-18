import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  const { message, type } = notification;

  if (message === null) {
    return null;
  }
  const color = type === "error" ? "red" : "green";

  return (
    <div className="notification" style={{ color }}>
      {message}
    </div>
  );
};

export default Notification;
