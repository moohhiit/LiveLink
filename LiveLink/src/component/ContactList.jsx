import React from 'react';

const ContactList = ({publicList, contacts, onSelect, selectedId, mode, setMode }) => {
    const filteredContacts = contacts.filter((c) => c.type === mode);

    return (
        <div className="w-full md:w-1/3 bg-gray-100 p-4 border-r overflow-y-auto text-black flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Contacts</h2>
         
            <div className="flex justify-between space-x-2 mb-4">
               
                <div
                    onClick={() => setMode('public')}
                    className={`cursor-pointer px-14 py-1 rounded-full text-sm font-medium ${mode === 'public'
                            ? 'bg-white text-black shadow'
                            : 'bg-gray-100 text-gray-700 '
                        }`}
                >
                    Public
                </div>
                 <div
                    onClick={() => setMode('private')}
                    className={`cursor-pointer px-14 py-1 rounded-full text-sm font-medium ${mode === 'private'
                            ? 'bg-white text-black shadow'
                            : 'bg-gray-100 text-gray-700 '
                        }`}
                >
                    Private
                </div>
            </div>

            <ul className="space-y-2">
                {publicList.map((contact) => (
                    <li
                        key={contact.id}
                        onClick={() => onSelect(contact)}
                        className={`p-2 flex items-center gap-3 cursor-pointer rounded hover:bg-gray-200 ${selectedId === contact.id ? 'bg-gray-300' : ''
                            }`}
                    >
                       
                        <span className="text-left">{contact.username} <span className='text-xs text-gray-800' >{`#${contact.id}`}</span> </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
