import React from "react";

function Message({ message, isCurrentUser }) {
  const messageClass = isCurrentUser
    ? "justify-end bg-blue-500"
    : "justify-start bg-gray-300";

  return (
    <div className={`flex mb-4 items-start ${messageClass}`}>
      {!isCurrentUser && (
        <img
          src={message.photoURL}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div className="flex flex-col">
        <span className="font-bold mb-1">{message.displayName}</span>
        <p className="p-2 rounded-lg">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
