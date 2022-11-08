import 'react-native-gesture-handler';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {AppContext, initialAppState, AppState} from './AppContext';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {watchGeolocation} from '../geolocation/watchGeolocation';
import {AppNavigator} from './AppNavigator';

async function init(): Promise<AppState> {
  const isPermissionGranted = await requestPermission();
  const coords = await getCoords();
  const user = {
    ...initialAppState.user,
    coords: coords ?? initialAppState.user.coords,
  };
  const isLoading = !isPermissionGranted;

  return {
    ...initialAppState,
    user,
    coords: coords ?? initialAppState.user.coords,
    isLoading,
  };
}

export function App() {
  const [appState, setAppState] = useState(initialAppState);

  useEffect(() => {
    init().then(setAppState);
    const {clearWatchId} = watchGeolocation({
      onPositionChange(position) {
        position.coords &&
          setAppState({
            ...appState,
            coords: position.coords,
          });
      },
    });

    return () => {
      clearWatchId();
    };
  }, []);

  if (appState.isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <AppContext.Provider value={{appState, setAppState}}>
        <AppNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}
