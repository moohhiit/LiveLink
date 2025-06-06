import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ContactList from '../component/ContactList';
import ChatScreen from '../component/ChatScreen';
import { useSocket } from '../Context/SocketContext';

const contactsData = [
    { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1', type: 'private' },
    { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2', type: 'public' },
    { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3', type: 'private' },
    { id: 4, name: 'Dana', avatar: 'https://i.pravatar.cc/150?img=4', type: 'public' },
];
export default function ChatPage() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState({});
    const [mode, setMode] = useState('private');
    const [publicList, setpubllicList] = useState([])

    const socket = useSocket()


    const handleSendMessage = (text) => {
        if (!selectedContact) return;

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

    useEffect(()=>{
        console.log(publicList)
    })
    useEffect(() => {
        if (!socket) return

        socket.emit('get-all-users')
        socket.on('all-user', setpubllicList)
       
    }, [socket])

    return (
        <div className="h-screen w-screen bg-gray flex items-center justify-center">
            <div className="w-full max-w-5xl h-[90vh] md:h-[70vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-black">

                <ContactList
                    publicList={publicList}
                    contacts={publicList}
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
