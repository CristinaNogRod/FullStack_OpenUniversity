import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
        return action.payload
    case "REMOVE_NOTIFICATION":
        return null
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const setNotification = (message) => {
  const notificationDispatch = useNotificationDispatch()
  return () => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
    }, 4000)
  }
}

export default NotificationContext