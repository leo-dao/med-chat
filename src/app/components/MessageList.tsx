import React from "react";
import styled from "styled-components";
import { Message, User } from "../../../interfaces/types";
import MessageComponent from "./MessageComponent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <Container>
      {messages.map((message) => (
        <MessageComponent
          key={message.id}
          message={message}
          isCurrentUser={message.sender === currentUser}
        />
      ))}
    </Container>
  );
};

export default MessageList;