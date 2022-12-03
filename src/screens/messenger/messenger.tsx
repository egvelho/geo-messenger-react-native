import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from './chat';
import {ContactsScreen} from './contacts';
import {UserState} from '@src/types';
import screens from '@src/screens/screens.json';

const Stack = createNativeStackNavigator();

export function MessengerScreen() {
  return (
    <Stack.Navigator
      initialRouteName={screens.messenger.contacts}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screens.messenger.contacts}
        component={ContactsScreen}
        options={({route}) => ({
          headerShown: true,
          headerBackVisible: false,
        })}
      />
      <Stack.Screen
        name={screens.messenger.chat}
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
