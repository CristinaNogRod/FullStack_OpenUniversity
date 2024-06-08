import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers:{
        addNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return null
        }
    }
})
  
export const {addNotification, removeNotification} = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async dispatch => {
      dispatch(addNotification(message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, seconds*1000)
    }
  }

export default notificationSlice.reducer