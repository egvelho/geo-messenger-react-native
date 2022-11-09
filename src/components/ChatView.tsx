import {useRef} from 'react';
import {FlatList, StyleSheet, View, TextInput} from 'react-native';
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
    <View style={styles.chatWrapper}>
      <View style={styles.messagesWrapper}>
        <FlatList
          data={messages}
          renderItem={message => <MessageItem {...message.item} />}
          ref={ref => (flatListRef.current = ref)}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: false})
          }
          onLayout={() => flatListRef.current?.scrollToEnd({animated: false})}
        />
      </View>
      <View style={styles.messageInputWrapper}>
        <TextInput
          style={styles.messageInput}
          value={message}
          placeholder="Digite sua mensagem"
          onChangeText={message => onChangeMessage(message)}
          onSubmitEditing={() => {
            onSendMessage(message);
            onChangeMessage('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatWrapper: {
    display: 'flex',
    flex: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    height: '100%',
  },
  messagesWrapper: {
    flex: 1,
  },
  messageInputWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  messageInput: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingVertical: 16,
  },
});
