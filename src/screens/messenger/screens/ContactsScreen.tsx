import {useContext} from 'react';
import {Box} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {ContactsList} from '../../../components/ContactsList';
import {UsersPositionsContext} from '../../../messenger/UsersPositionsContext';
import messengerScreens from '../messengerScreens.json';

export function ContactsScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const {usersPositions} = useContext(UsersPositionsContext);
  const users = Object.values(usersPositions).map(position => ({
    ...position,
    key: position.id,
  }));

  return (
    <Box height="full">
      <ContactsList
        users={users}
        onItemPress={user => {
          navigation.navigate(messengerScreens.chat, user);
        }}
      />
    </Box>
  );
}
