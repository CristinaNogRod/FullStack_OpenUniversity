import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginInfo from "./components/LoginInfo";
import BlogList from "./components/BlogList";

import blogService from "./services/blogs";

import { setNotification } from "./reducers/notificationReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [blogs, setBlogs] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(initializeUser(user));
  }, []);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnBlog) => {
      setBlogs(blogs.concat(returnBlog));
      blogFormRef.current.toggleVisibility();
      dispatch(setNotification("Added new blog", "success"));
    });
  };

  const handleLikes = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnBlog)));
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this blog?")) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  const showBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <LoginInfo />

        <h2>create new blog</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        <p />
        <BlogList
          sortedBlogs={sortedBlogs}
          updateBlog={handleLikes}
          deleteBlog={handleDelete}
        />
      </div>
    );
  };

  return (
    <div>
      {user === null ? (
        <div>
          <Notification />
          <LoginForm />
        </div>
      ) : (
        showBlogs()
      )}
    </div>
  );
};

export default App;
