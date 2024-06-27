const Notification = ({ notification }: { notification: string }) => {
  const notificationStyle = {
    color: "red",
  };
  return <div style={notificationStyle}>{notification}</div>;
};

export default Notification;
