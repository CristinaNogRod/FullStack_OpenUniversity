import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    // removeBlog(state, action) {
    //   const id = action.payload;
    //   state.filter((blog) => blog.id !== id);
    // },
    // addLike(state, action) {
    //   const id = action.payload;
    //   const blogToChange = state.find((blog) => blog.id === id);
    //   const newBlog = {
    //     ...blogToChange,
    //     likes: blogToChange.likes + 1,
    //   };
    //   return state.map((blog) => {
    //     blog.id !== id ? blog : newBlog;
    //   });
    // },
  },
});
//, removeBlog, addLike
export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

// export const increaseLikes = (id, blogObject) => {
//   return async (dispatch) => {
//     await blogService.update(id, blogObject);
//     dispatch(addLike(id));
//   };
// };

// export const deleteBlog = (id) => {
//   return async (dispatch) => {
//     await blogService.remove(id);
//     dispatch(removeBlog(id));
//   };
// };

export default blogSlice.reducer;
