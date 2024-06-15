import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogs from "./services/blogs";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogs.reducer,
  },
});

export default store;
