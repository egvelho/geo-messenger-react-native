import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from './screens/ChatScreen';
import {ContactsScreen} from './screens/ContactsScreen';
import messengerScreens from './messengerScreens.json';

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
      <Stack.Screen name={messengerScreens.chat} component={ChatScreen} />
    </Stack.Navigator>
  );
}
