import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Togglable from "./Togglable";
import { increaseLike, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const blogRef = useRef();

  const handleLikes = (event) => {
    event.preventDefault();
    dispatch(increaseLike(blog));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm("Do you want to delete this blog?")) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div className="blog">
      <span>
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="view" buttonCancel={"hide"} ref={blogRef}>
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={handleLikes}> likes </button>
          <br />
          {blog.user ? <div>{blog.user.name}</div> : null}
          {user && blog.user && user.username === blog.user.username ? (
            <button onClick={handleDelete}> remove </button>
          ) : null}
        </div>
      </Togglable>
    </div>
  );
};

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
