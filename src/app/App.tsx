import {AppLayoutProvider} from './AppLayoutProvider';
import {AppInitProvider} from './AppInitProvider';
import {RootScreen} from '@src/screens/root';
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
        <AppInitProvider>
          <AppLayoutProvider>
            <RootScreen />
          </AppLayoutProvider>
        </AppInitProvider>
      </AppStorePersistGate>
    </AppStoreProvider>
  );
}
