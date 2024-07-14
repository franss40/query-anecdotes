/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return action.payload
    default:
      return state
  }
}

export const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, '')
  return (
    <notificationContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </notificationContext.Provider>
  )
}

export const useMessageDispatch = () => {
  const messageDispatch = useContext(notificationContext)
  return messageDispatch[1]
}

export default notificationReducer