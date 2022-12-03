import {Box} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {useAppSelector} from '@src/app/appStore';
import {ContactsList} from '@src/messenger/ContactsList';
import screens from '@src/screens/screens.json';

export function ContactsScreen({navigation}: StackScreenProps<ParamListBase>) {
  const usersPositions = useAppSelector(
    state => state.usersPositions.positions,
  );
  const users = Object.values(usersPositions);

  return (
    <Box height="full">
      <ContactsList
        users={users}
        onItemPress={user => {
          navigation.navigate(screens.messenger.chat, user);
        }}
      />
    </Box>
  );
}
