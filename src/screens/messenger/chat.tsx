import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {useState} from 'react';
import {useAppSelector} from '@src/app/appStore';
import {ChatView} from '@src/messenger/ChatView';
import {UserState} from '@src/types';
import {useChatMessages} from '@src/user/useChatMessages';

export function ChatScreen({route}: StackScreenProps<ParamListBase>) {
  const myself = useAppSelector(state => state.user);
  const [message, setMessage] = useState('');
  const stranger = route.params as UserState;
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
