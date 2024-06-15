import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

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
