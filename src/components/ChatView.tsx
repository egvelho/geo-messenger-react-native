import {FlatList} from 'react-native';
import {MessageItem, MessageItemProps} from './MessageItem';
import styled from 'styled-components/native';

const MessageListWrapper = styled.View`
  flex: 5;
  background-color: #fff;
  padding-horizontal: 8px;
`;

export type ChatViewProps = {
  messages: MessageItemProps[];
};

export function ChatView({messages}: ChatViewProps) {
  return (
    <MessageListWrapper>
      <FlatList
        data={messages}
        renderItem={message => <MessageItem {...message.item} />}
      />
    </MessageListWrapper>
  );
}
