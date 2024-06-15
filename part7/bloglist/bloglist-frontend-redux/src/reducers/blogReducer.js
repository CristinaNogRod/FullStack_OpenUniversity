import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addLike(state, action) {
      const id = action.payload;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { addLike, appendBlog, setBlogs, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};

export const increaseLike = (blog) => {
  return async (dispatch) => {
    const blogObject = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blogObject.id, blogObject);
    dispatch(addLike(blogObject.id));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
