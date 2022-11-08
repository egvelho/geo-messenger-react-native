import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from './screens/ChatScreen';
import {ContactsScreen} from './screens/ContactsScreen';
import messengerScreens from './messengerScreens.json';
import {UserState} from '../../types';

const Stack = createNativeStackNavigator();

export function MessengerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={messengerScreens.contacts}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={messengerScreens.contacts}
        component={ContactsScreen}
      />
      <Stack.Screen
        name={messengerScreens.chat}
        component={ChatScreen}
        options={({route}) => ({
          headerShown: true,
          headerTitle: (route.params as UserState).name,
          headerBackVisible: true,
        })}
      />
    </Stack.Navigator>
  );
}
