import {useContext, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {UserState} from '../../../types';
import {AppContext} from '../../../app/AppContext';
import {ContactsList} from '../../../components/ContactsList';
import {ChatView} from '../../../components/ChatView';
import {UsersPositionsContext} from '../../../messenger/UsersPositionsContext';
import messengerScreens from '../messengerScreens.json';
import {useChatMessages} from '../../../messenger/useChatMessages';

const ContactsScreenContainer = styled.View`
  flex-direction: row;
  height: 100%;
`;

export function ContactsScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const {
    appState: {user: myself},
  } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [stranger, setStranger] = useState<UserState>(myself);
  const {messages, sendMessage, unsubscribe} = useChatMessages({
    myself,
    stranger,
  });
  console.log(messages);

  const {usersPositions} = useContext(UsersPositionsContext);
  const users = Object.values(usersPositions).map(position => ({
    ...position,
    key: position.id,
  }));

  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <ContactsScreenContainer>
      <ContactsList
        users={users}
        isLandscape={isLandscape}
        onItemPress={user => {
          if (isLandscape) {
            unsubscribe();
            setStranger(user);
          } else {
            navigation.navigate(messengerScreens.chat, user);
          }
        }}
      />
      {isLandscape && (
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
            color:
              message.senderId === myself.id ? myself.color : stranger.color,
            text: message.text,
            isMyself: message.senderId === myself.id,
          }))}
        />
      )}
    </ContactsScreenContainer>
  );
}
