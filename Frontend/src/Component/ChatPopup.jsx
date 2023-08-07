import React from 'react';
import { FaComment, FaRobot } from 'react-icons/fa';

const ChatPopup = ({ messages, inputValue, handleChange, toggleChat }) => {
  return (
    <div className="chat-popup">
      <div className="chat-window">
        <div className="chat-header" onClick={toggleChat}>
          <FaComment size={24} />
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUserMessage ? 'user' : 'chatbot'}`}>
              {message.icon && <span className="icon">{message.icon}</span>}
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" value={inputValue} onChange={handleChange} placeholder="Type your message..." />
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
