import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginInfo from "./components/LoginInfo";
import BlogList from "./components/BlogList";

import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <div>
      {user === null ? (
        <div>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <LoginInfo />
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
