import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ContactList from '../component/ContactList';
import ChatScreen from '../component/ChatScreen';
import { useSocket } from '../Context/SocketContext';
import { useMessage } from '../Context/MessageContext';

export default function ChatPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState({});
    const [mode, setMode] = useState('private');
   
    const {sendPrivateMessage} = useMessage()
    const { socket , socketId , onlineUserList } = useSocket()


    const handleSendMessage = (text) => {
        if (!selectedContact) return;
        sendPrivateMessage(socketId , selectedContact.id , text)
       

        const newMessage = {
            id: Date.now(),
            sender: 'You',
            text,
        };

        setChats((prev) => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
        }));
    };

   
    return (
        <div className="h-screen w-screen bg-gray flex items-center justify-center">
            <div className="w-full max-w-5xl h-[90vh] md:h-[70vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-black">

                <ContactList
                    privateList={onlineUserList}
                   
                    onSelect={setSelectedContact}
                    selectedId={selectedContact?.id}
                    mode={mode}
                    setMode={setMode}
                />
                <ChatScreen
                    contact={selectedContact}
                    messages={chats[selectedContact?.id] || []}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    )
}
