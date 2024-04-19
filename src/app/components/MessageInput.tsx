import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
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

interface MessageInputProps {
    onSend: (message: string) => void;
    messageText: string;
    setMessageText: (message: string) => void;
  }

const MessageInput: React.FC<MessageInputProps> = ({ onSend, messageText, setMessageText }) => {
    return (
        <Container>
            <Input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSend(messageText);
                    }
                }}
                placeholder="Type a message..."
            />
            <SendButton onClick={() => onSend(messageText)}>Send</SendButton>
        </Container>
    );
}

export default MessageInput;
