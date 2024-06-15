import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      dispatch(logoutUser(null));
    } catch (exception) {
      dispatch(setNotification("Failed to Logout", "error"));
    }
  };
  return (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout} type="button">
        logout
      </button>
    </div>
  );
};

export default LoginInfo;
