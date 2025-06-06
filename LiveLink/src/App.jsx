import React, { useEffect, useState } from 'react';
import ContactList from './component/ContactList';
import ChatScreen from './component/ChatScreen';
import AuthPage from './Auth/AuthPage';
import socket from './services/Socket.js';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './component/ProtectRoute.jsx';
import ChatPage from './page/ChatPage.jsx';


const contactsData = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1', type: 'private' },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2', type: 'public' },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3', type: 'private' },
  { id: 4, name: 'Dana', avatar: 'https://i.pravatar.cc/150?img=4', type: 'public' },
];

function App() {
  // const [selectedContact, setSelectedContact] = useState(null);
  // const [user, setUser] = useState(null);
  // const [chats, setChats] = useState({});
  // const [mode, setMode] = useState('private');





  // const handleSendMessage = (text) => {
  //   if (!selectedContact) return;

  //   const newMessage = {
  //     id: Date.now(),
  //     sender: 'You',
  //     text,
  //   };

  //   setChats((prev) => ({
  //     ...prev,
  //     [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
  //   }));
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   console.log("Chech Auth ")
  //   if (token) {
  //     axios.get('http://localhost:5001/api/login', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then((res) => {
  //       console.log(res)
  //     })
  //   }
  // }, [])

  // if (!user) {
  //   return <AuthPage onAuthSuccess={setUser} />
  // }
  // return (
  //   <div className="h-screen w-screen bg-gray flex items-center justify-center">
  //     <div className="w-full max-w-5xl h-[90vh] md:h-[70vh] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden text-black">
  //       <ContactList
  //         contacts={contactsData}
  //         onSelect={setSelectedContact}
  //         selectedId={selectedContact?.id}
  //         mode={mode}
  //         setMode={setMode}
  //       />
  //       <ChatScreen
  //         contact={selectedContact}
  //         messages={chats[selectedContact?.id] || []}
  //         onSend={handleSendMessage}
  //       />
  //     </div>
  //   </div>

  return(
    <Routes>
      <Route path='/login' element={<AuthPage/>} />
      <Route 
      path='/'
      element={
        <ProtectedRoute>
          <ChatPage/>
        </ProtectedRoute>
      }
      
      />
    </Routes>
  )

}

export default App;
