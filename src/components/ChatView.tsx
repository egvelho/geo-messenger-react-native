import {useRef} from 'react';
import {Box, Flex, Divider, Input} from 'native-base';
import {FlatList} from 'react-native';
import {MessageItem, MessageItemProps} from './MessageItem';

export type ChatViewProps = {
  messages: MessageItemProps[];
  message: string;
  onChangeMessage: (message: string) => void;
  onSendMessage: (message: string) => Promise<void> | void;
};

export function ChatView({
  messages,
  message,
  onChangeMessage,
  onSendMessage,
}: ChatViewProps) {
  const flatListRef = useRef<any>(undefined);

  return (
    <Box paddingX="2" height="full">
      <Flex flex="1">
        <FlatList
          data={messages}
          renderItem={message => <MessageItem {...message.item} />}
          ref={ref => (flatListRef.current = ref)}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: false})
          }
          onLayout={() => flatListRef.current?.scrollToEnd({animated: false})}
        />
      </Flex>
      <Input
        fontSize="sm"
        variant="rounded"
        paddingX="2"
        marginBottom="2"
        value={message}
        placeholder="Digite sua mensagem"
        onChangeText={message => onChangeMessage(message)}
        onSubmitEditing={() => {
          onSendMessage(message);
          onChangeMessage('');
        }}
      />
    </Box>
  );
}
