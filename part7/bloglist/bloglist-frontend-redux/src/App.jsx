import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/UsersList";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";
import BlogsView from "./views/BlogsView";

import { initializeUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  const matchUser = useMatch("/users/:id");
  const someUser = matchUser
    ? users.find((a) => a.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("/blogs/:id");
  const someBlog = matchBlog
    ? blogs.find((a) => a.id === matchBlog.params.id)
    : null;

  return (
    <div>
      {user === null ? (
        <div>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <NavBar />

          <h2>blogs</h2>
          <Notification />

          <Routes>
            <Route path="/" element={<BlogsView />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SingleUser user={someUser} />} />
            <Route path="/blogs/:id" element={<SingleBlog blog={someBlog} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
