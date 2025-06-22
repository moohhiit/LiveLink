import React, { createContext, useContext, useEffect } from 'react'
import { useSocket } from './SocketContext'



const MessageContext = createContext()

export function MessgaeProvider({ children }) {
    const { socket } = useSocket()

    const sendPrivateMessage = (senderId, receiverId, message) => {
        socket.emit('private_message',{ senderId, receiverId, message})
    }

    return (
        <MessageContext.Provider value={{ sendPrivateMessage }} >
            {children}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    return useContext(MessageContext)
}