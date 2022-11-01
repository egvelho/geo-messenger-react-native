import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {useWindowDimensions, Alert} from 'react-native';
import {generateRandomColor} from '../../../utils/generateRandomColor';
import {ContactsList} from '../../../components/ContactsList';
import messengerScreens from '../messengerScreens.json';

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
  return (
    <ContactsList
      users={users}
      isLandscape={isLandscape}
      onItemPress={user => {
        navigation.navigate(messengerScreens.chat, user);
      }}
    />
  );
}
