import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { Message, User } from '../interfaces/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
`;

const ClearButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #f44336;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  width: fit-content;

  margin-left: auto;
  margin-right: auto;

  &:hover {

    background-color: #d32f2f;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ isCurrentUser }) => (isCurrentUser ? '#dcf8c6' : '#ffffff')};
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
  border: ${({ isCurrentUser }) => (isCurrentUser ? '2px solid #34b7f1' : '2px solid #eee')};
`;

const MessageSender = styled.div`
  font-size: 12px;
  color: black;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const MessageText = styled.div`
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  flex-grow: 1;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #34b7f1;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #289ae2;
  }
`;

const UserSelector = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>('patient');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleMessageSend = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: uuidv4(),
        sender: currentUser,
        text: messageText,
        timestamp: new Date().toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleClearConversation = () => {
    setMessages([]); // clear messages
  };

  return (
    <Wrapper>
      <Title>Med Chat</Title>
      <MessageContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id} isCurrentUser={message.sender === currentUser}>
            <MessageSender>{message.sender} @ {message.timestamp}</MessageSender>
            <MessageText>{message.text}</MessageText>
          </MessageBubble>
        ))}
      <div ref={messagesEndRef} />
      </MessageContainer>
      <Input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
      />
      <UserSelector value={currentUser} onChange={e => setCurrentUser(e.target.value as User)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </UserSelector>
      <SendButton onClick={handleMessageSend}>Send</SendButton>
      {messages.length > 0 && (
        <ClearButton onClick={handleClearConversation}>
          <FaTrash /> Clear Chat
        </ClearButton>
      )}
    </Wrapper>
  );
};

export default Chat;
