import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const color = notification.type === 'error' ? 'red' : 'green';

  return (
    <div className="notification" style={{ color }}>
      {notification.message}
    </div>
  );
};

export default Notification;
