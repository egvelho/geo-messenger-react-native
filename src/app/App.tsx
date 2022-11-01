import 'react-native-gesture-handler';
import {useState, useEffect, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {AppContext, initialAppState, AppState} from './AppContext';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {AppNavigator} from './AppNavigator';
import {ThemeProvider} from 'styled-components/native';

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
    isLoading,
  };
}

const darkTheme = {
  bgColor: '#000',
};

const lightTheme = {
  bgColor: '#fff',
};

export function App() {
  const [appState, setAppState] = useState(initialAppState);

  useEffect(() => {
    init().then(setAppState);
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
