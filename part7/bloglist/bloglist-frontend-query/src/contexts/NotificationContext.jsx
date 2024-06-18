import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return { message: null, type: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  });

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const setNotification = () => {
  const valueAndDispatch = useContext(NotificationContext);
  const dispatch = valueAndDispatch[1];
  return ({ message, type }) => {
    dispatch({ type: "SET_NOTIFICATION", payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    }, 5000);
  };
};

export default NotificationContext;
