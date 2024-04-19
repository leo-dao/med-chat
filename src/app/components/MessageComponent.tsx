import React from "react";
import styled from "styled-components";
import { Message } from "../../../interfaces/types";
import { FaUserCircle } from "react-icons/fa";

const Container = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  margin-bottom: 10px;
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
`;

const MessageText = styled.div`
  font-size: 16px;
`;

const MessageSender = styled.div`
  font-size: 12px;
  color: black;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ isCurrentUser }) => (isCurrentUser ? '#dcf8c6' : '#ffffff')};
`;

interface MessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageComponent: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  return (
    <Container isCurrentUser={isCurrentUser}>
      {!isCurrentUser && <FaUserCircle size={30} />}
      <MessageBubble key={message.id} isCurrentUser={isCurrentUser}>
        <MessageSender>{message.sender} @ {new Date(message.timestamp).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })} 
        </MessageSender>
        <MessageText>{message.text}</MessageText>
      </MessageBubble>
    </Container>
  );
}
export default MessageComponent;