import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {ChatView} from '../../../components/ChatView';
import {generateRandomColor} from '../../../utils/generateRandomColor';
import {UserState} from '../../../types';
import {AppContext} from '../../../app/AppContext';
import {useChatMessages} from '../../../messenger/useChatMessages';

const messages = Array.from({length: 50}, (_, index) => ({
  isMyself: Math.random() > 0.5,
  text: `Texto ${index}`,
  color: generateRandomColor(),
}));

export function ChatScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const {
    appState: {user: myself},
  } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const stranger: UserState = route.params as any;
  const {messages, sendMessage} = useChatMessages({myself, stranger});

  return (
    <ChatView
      message={message}
      onChangeMessage={setMessage}
      onSendMessage={text =>
        sendMessage({
          senderId: myself.id,
          text,
          timestamp: Date.now(),
        })
      }
      messages={messages.map(message => ({
        color: message.senderId === myself.id ? myself.color : stranger.color,
        text: message.text,
        isMyself: message.senderId === myself.id,
      }))}
    />
  );
}
