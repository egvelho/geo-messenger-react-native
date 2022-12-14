import {useEffect} from 'react';
import {useToast, Alert, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import screens from '@src/screens/screens.json';

export function AppPushNotifications() {
  const toast = useToast();
  const navigation = useNavigation<any>();

  useEffect(() => {
    messaging().onMessage(async message => {
      // Eu executo quando o aplicativo está aberto
      console.log('onMessage', message);
      if (message?.data?.json) {
        const data = JSON.parse(message.data.json);
        if (data.isFeed) {
          toast.show({
            render() {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate(screens.feed.feed as never, {
                      screen: screens.feed.list,
                    });
                  }}>
                  <Alert status="info" width="full">
                    {message?.notification?.title}
                  </Alert>
                </Pressable>
              );
            },
          });
        }
      }
    });

    messaging()
      .getInitialNotification()
      .then(message => {
        // Eu executo quando o usuário clica na notificação com
        // o app fechado
        console.log('getInitialNotification', message);
        if (message?.data?.json) {
          const data = JSON.parse(message.data.json);
          if (data.isFeed) {
            navigation.navigate(screens.feed.feed as never, {
              screen: screens.feed.list,
            });
          } else if (data.name !== undefined) {
            navigation.navigate(screens.messenger.messenger, {
              screen: screens.messenger.chat,
              params: data,
              initial: false,
            });
          }
        }
      });

    messaging().onNotificationOpenedApp(async message => {
      // Eu executo quando o usuário clica na notificação
      console.log('onNotificationOpenedApp', message);
      if (message?.data?.json) {
        const data = JSON.parse(message.data.json);
        if (data.isFeed) {
          navigation.navigate(screens.feed.feed as never, {
            screen: screens.feed.list,
          });
        } else if (data.name !== undefined) {
          navigation.navigate(screens.messenger.messenger, {
            screen: screens.messenger.chat,
            params: data,
            initial: false,
          });
        }
      }
    });
  }, []);

  return null;
}
