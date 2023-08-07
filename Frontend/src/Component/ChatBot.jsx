import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaComment } from 'react-icons/fa';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import RobotIcon from './RobotIcon';

const theme = {
  background: '#861f41',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#861f41',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#861f41',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  width: ${(props) => (props.isChatOpen ? '400px' : '55px')};
  border-radius: ${(props) => (props.isChatOpen ? '10px' : '50%')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background: #fff;
  transition: width 0.3s;
  
`;


const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.headerBgColor};
  color: ${(props) => props.theme.headerFontColor};
  font-size: ${(props) => props.theme.headerFontSize};
  
`;

const ChatMessages = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 15px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.background};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.headerFontColor};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatMessagesRef = useRef(null);

  const resetChat = () => {
    setMessages([]);
    setInputValue('');
  };

  useEffect(() => {
    const sendMessage = (text, isUserMessage) => {
      const newMessages = [
        ...messages,
        {
          text,
          isUserMessage,
          icon: isUserMessage ? null : <RobotIcon />,
          timestamp: new Date().toLocaleTimeString(), // Add timestamp
        },
      ];
      setMessages(newMessages);

      if (!isUserMessage) {
        setInputValue('');
      }
    };

    const handleUserMessage = async () => {
      try {
        const response = await axios.post('http://localhost:8090/chatbot/getMessageReply', {
          messageText: inputValue,
        });

        sendMessage(response.data, false);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (inputValue.trim() !== '') {
          sendMessage(inputValue, true);
          handleUserMessage();
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [inputValue, messages]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    resetChat();
    const sendMessage = (text, isUserMessage) => {
      const newMessages = [
        ...messages,
        {
          text,
          isUserMessage,
          icon: isUserMessage ? null : <RobotIcon />,
          timestamp: new Date().toLocaleTimeString(), // Add timestamp
        },
      ];
      setMessages(newMessages);

      if (!isUserMessage) {
        setInputValue('');
      }
    };

    const handleChatbotMessage = () => {
      if (isChatOpen) {
        resetChat();
        sendMessage('Welcome! How may I assist you?', false);
      }
    };

    handleChatbotMessage();
  }, [isChatOpen]);

  useEffect(() => {
    if (isChatOpen && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [isChatOpen, messages]);

  return (
    <ThemeProvider theme={theme}>
      <ChatbotContainer isChatOpen={isChatOpen}>
        <ChatHeader>
          <FaComment size={20} onClick={toggleChat} />
          {isChatOpen && <CloseButton onClick={toggleChat}>X</CloseButton>}
        </ChatHeader>
        {isChatOpen && (
          <ChatMessages ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <div key={index}>
                {!message.isUserMessage && message.icon}
                {!message.isUserMessage && <div>Bot:</div>}
                <div>{message.text}</div>
                <div>{message.timestamp}</div>
              </div>
            ))}
          </ChatMessages>
        )}
        {isChatOpen && (
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Type your message..."
            />
          </ChatInputContainer>
        )}
      </ChatbotContainer>
    </ThemeProvider>
  );
};

export default Chatbot;
