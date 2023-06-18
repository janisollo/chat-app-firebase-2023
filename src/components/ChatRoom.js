import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Message from "./Message"; // import the Message component

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      createdAt: new Date(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Link to="/profile">Profile</Link>
      <div className="overflow-auto h-full">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isCurrentUser={message.uid === auth.currentUser.uid}
          />
        ))}
      </div>
      <form
        className="mt-auto flex items-center p-5 bg-white border-t border-gray-200"
        onSubmit={sendMessage}
      >
        <input
          className="rounded-l-md flex-grow py-2 px-4 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className="py-2 px-6 bg-indigo-500 text-white rounded-r-md"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
