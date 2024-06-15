import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

import Togglable from "./Togglable";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(setNotification("Added new blog", "success"));

    setTitle("");
    setAuthor("");
    setURL("");
  };

  return (
    <>
      <h2>create new blog</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              className="title-input"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="author"
              value={author}
              name="author"
              className="author-input"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="url"
              value={url}
              name="url"
              className="url-input"
              onChange={({ target }) => setURL(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </Togglable>
    </>
  );
};

export default BlogForm;
