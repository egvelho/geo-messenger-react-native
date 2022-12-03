import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {ParamListBase} from '@react-navigation/native';
import {useAppSelector} from '@src/app/appStore';
import screens from '@src/screens/screens.json';
import {UsersMap} from '@src/map/UsersMap';

export function HomeScreen({navigation}: BottomTabScreenProps<ParamListBase>) {
  const isDarkMap = useAppSelector(state => state.app.isDarkTheme);
  const user = useAppSelector(state => state.user);

  return (
    <UsersMap
      user={user}
      isDarkMap={isDarkMap}
      onMarkerPress={user => {
        navigation.navigate(screens.messenger.messenger, {
          screen: screens.messenger.chat,
          params: user,
          initial: false,
        });
      }}
    />
  );
}
