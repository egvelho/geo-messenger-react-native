import {useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {generateRandomColor} from '../../../utils/generateRandomColor';
import {ContactsList} from '../../../components/ContactsList';
import {ChatView} from '../../../components/ChatView';
import messengerScreens from '../messengerScreens.json';

const ContactsScreenContainer = styled.View`
  flex-direction: row;
`;

export function ContactsScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  const users = Array.from({length: 30}, (_, index) => ({
    name: `User ${index}`,
    color: generateRandomColor(),
  }));

  const messages = Array.from({length: 50}, (_, index) => ({
    isMyself: Math.random() > 0.5,
    text: `Texto ${index}`,
    color: generateRandomColor(),
  }));

  return (
    <ContactsScreenContainer>
      <ContactsList
        users={users}
        isLandscape={isLandscape}
        onItemPress={user => {
          navigation.navigate(messengerScreens.chat, user);
        }}
      />
      {isLandscape && <ChatView messages={messages} />}
    </ContactsScreenContainer>
  );
}
