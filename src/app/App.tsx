import {AppLayoutProvider} from './AppLayoutProvider';
import {AppInitProvider} from './AppInitProvider';
import {appStore, AppStoreProvider} from './appStore';
import {RootScreen} from '@src/screens/root';

export function App() {
  return (
    <AppStoreProvider store={appStore}>
      <AppInitProvider>
        <AppLayoutProvider>
          <RootScreen />
        </AppLayoutProvider>
      </AppInitProvider>
    </AppStoreProvider>
  );
}
