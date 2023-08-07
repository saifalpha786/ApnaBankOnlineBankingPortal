import React from 'react';
import { FaComment } from 'react-icons/fa';

const ChatbotIcon = ({ toggleChat }) => {
  return (
    <div className="chatbot-icon" onClick={toggleChat}>
      <FaComment size={24} />
    </div>
  );
};

export default ChatbotIcon;
