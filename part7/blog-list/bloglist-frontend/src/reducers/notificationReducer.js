import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, type) => {
  return (dispatch) => {
    dispatch(addNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
