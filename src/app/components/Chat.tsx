import React, { useState, useEffect, useRef } from 'react';
import UserSelector from './UserSelector';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { Message, User } from '../../../interfaces/types';
import supabase from '../../lib/supabase';

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

const Title = styled.div`
  padding-bottom: 10px;
  text-align: center;
  margin-bottom: 50px;
  font-size: 40px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
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

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>('patient');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleMessageSend = async () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: uuidv4(),
        sender: currentUser,
        text: messageText,
        timestamp: new Date().toISOString()
      };
  
    const { error } = await supabase
        .from('messages') 
        .insert([newMessage]);
  
      if (error) {
        console.error('Error inserting message:', error);
      } else {
        setMessages([...messages, newMessage]);
        setMessageText('');
      } 
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
  };

  return (
    <Wrapper>
      <Title>Med Chat</Title>

      <MessageList messages={messages} currentUser={currentUser} />

      <div ref={messagesEndRef} />
      <MessageInput onSend={handleMessageSend} messageText={messageText} setMessageText={setMessageText} />
      <br />
      <UserSelector value={currentUser} onChange={(user) => setCurrentUser(user)} />
      {messages.length > 0 && (
        <ClearButton onClick={handleClearConversation}>
          <FaTrash /> Clear Chat
        </ClearButton>
      )}
    </Wrapper>
  );
};

export default Chat;