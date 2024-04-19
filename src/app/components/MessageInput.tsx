import React, {useState} from 'react';
import styled from 'styled-components';
import { IoSend, IoImageOutline } from 'react-icons/io5';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  flex-grow: 1;
  margin-right: 10px;
  text-align: center;
`;

const SendIcon = styled(IoSend)`
  position: absolute;
  right: 20px;
  top: 45%;
  cursor: pointer;
  color: #34b7f1; 

  &:hover {
    color: #289ae2;
  }
`;

const ImageIcon = styled(IoImageOutline)`
  position: absolute;
  left: 20px;
  top: 45%;
  cursor: pointer;
  color: #34b7f1; 

  &:hover {
    color: #289ae2;
  }
`;

const FileNameDisplay = styled.div`
  margin-top: 5px;
  text-align: center;
  color: #666;
  font-size: 12px;
`;

interface MessageInputProps {
    onSend: (message: string) => void;
    messageText: string;
    setMessageText: (message: string) => void;
  }

const MessageInput: React.FC<MessageInputProps> = ({ onSend, messageText, setMessageText }) => {

    const [imageName, setImageName] = useState<string>('');

    const sendMessage = () => {
        if (messageText.trim() || imageName.trim()) {
            onSend(messageText);
            setMessageText('');
            setImageName('');
        }
    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageName(file.name);
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            onSend(dataUrl);
          };
          reader.readAsDataURL(file);
        }
      }

    return (
        <Wrapper>
            <InputContainer>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="fileInput"
                    onChange={handleImageChange}
                />
                <ImageIcon onClick={() => document.getElementById('fileInput')?.click()} />
                <Input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder="Type a message..."
                />
                <SendIcon onClick={sendMessage} />
            </InputContainer>  
            {imageName && <FileNameDisplay>Attached image: {imageName}</FileNameDisplay>}
    </Wrapper>
    );
}

export default MessageInput;
