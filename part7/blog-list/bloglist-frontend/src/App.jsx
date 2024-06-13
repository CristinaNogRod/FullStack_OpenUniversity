import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blogs';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error'));
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem('loggedBlogAppUser');
      setUser(null);
    } catch (exception) {
      dispatch(setNotification('Failed to Logout', 'error'));
    }
  };

  const addBlog = (blogObject) => {
    // blogFormRef.current.toggleVisibility()

    // POST request & reset states
    blogService.create(blogObject).then((returnBlog) => {
      setBlogs(blogs.concat(returnBlog));
      dispatch(setNotification('Added new blog', 'sucess'));
    });
  };

  const handleLikes = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnBlog)));
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you want to delete this blog?')) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  const loginForm = () => {
    return (
      <div>
        <Notification />
        <Login
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      </div>
    );
  };

  const showBlogs = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <span>{user.name} logged in</span>
        <button onClick={handleLogout} type="button">
          logout
        </button>

        <h2>create new blog</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        <p />
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleLikes}
            deleteBlog={handleDelete}
            user={user}
          />
        ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;
