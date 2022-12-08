import {AppLayoutProvider} from './AppLayoutProvider';
import {AppInitProvider} from './AppInitProvider';
import {RootScreen} from '@src/screens/root';
import {apolloClient, ApolloProvider} from '@src/utils/apolloClient';
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
              <RootScreen />
            </AppLayoutProvider>
          </AppInitProvider>
        </ApolloProvider>
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}
