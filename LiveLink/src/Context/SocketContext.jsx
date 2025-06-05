import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const { userName } = useAuth()
  const [socket, setsocket] = useState(null)

  useEffect(() => {
    if (!userName) return

    const newSocket  = io('http://localhost:5001', {
      auth: {
        userName: userName,
      },
    })
    setsocket(newSocket)

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id)
    })

    return () => {
      newSocket.disconnect()
      setsocket(null)
    
    }
  }, [userName])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}
