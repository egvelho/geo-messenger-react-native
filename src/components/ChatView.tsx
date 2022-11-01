import {MessageItem, MessageItemProps} from './MessageItem';
import styled from 'styled-components/native';

const ChatViewWrapper = styled.ScrollView`
  flex: 5;
  background-color: #fff;
  padding-horizontal: 8px;
`;

export type ChatViewProps = {
  messages: MessageItemProps[];
};

export function ChatView({messages}: ChatViewProps) {
  return (
    <ChatViewWrapper>
      {messages.map((message, index) => (
        <MessageItem key={index} {...message} />
      ))}
    </ChatViewWrapper>
  );
}
