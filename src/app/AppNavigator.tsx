import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {MessengerScreen} from '../screens/messenger/MessengerScreen';
import {FeedScreen} from '../screens/feed/FeedScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import screens from '../screens.json';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={screens.home}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={screens.messenger}
        component={MessengerScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="forum" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.home}
        component={HomeScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.profile}
        component={ProfileScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="person" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name={screens.feed}
        component={FeedScreen}
        options={{
          tabBarIcon({color, size}) {
            return <Icon name="rss-feed" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
