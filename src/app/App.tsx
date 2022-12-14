import {AppLayoutProvider} from './AppLayoutProvider';
import {AppInitProvider} from './AppInitProvider';
import {RootScreen} from '@src/screens/root';
import {apolloClient, ApolloProvider} from '@src/utils/apolloClient';
import {AppPushNotifications} from './AppPushNotifications';
import {
  appStore,
  appPersistor,
  AppStoreProvider,
  AppStorePersistGate,
} from './appStore';

export function App() {
  return (
    <AppStoreProvider store={appStore}>
      <AppStorePersistGate persistor={appPersistor}>
        <ApolloProvider client={apolloClient}>
          <AppInitProvider>
            <AppLayoutProvider>
              <AppPushNotifications />
              <RootScreen />
            </AppLayoutProvider>
          </AppInitProvider>
        </ApolloProvider>
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}
