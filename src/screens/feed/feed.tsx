import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FeedListScreen} from './feed-list';
import {FeedAddScreen} from './feed-add';
import screens from '@src/screens/screens.json';

const Stack = createNativeStackNavigator();

export function FeedScreen() {
  return (
    <Stack.Navigator initialRouteName={screens.feed.list}>
      <Stack.Screen
        name={screens.feed.list}
        component={FeedListScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen name={screens.feed.add} component={FeedAddScreen} />
    </Stack.Navigator>
  );
}
