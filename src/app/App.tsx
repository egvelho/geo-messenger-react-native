import {useState, useEffect} from 'react';
import {} from 'react-native';
import {Loader} from '../components/Loader';
import {AppContext, initialAppState} from './AppContext';
import {requestPermission} from '../geolocation/requestPermission';
import {getCoords} from '../geolocation/getCoords';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {MessengerScreen} from '../screens/messenger/MessengerScreen';

function delay(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * 1000);
  });
}

async function init() {
  //const isPermissionGranted = await requestPermission();
  //const coords = await getCoords();

  //return isPermissionGranted;
  return true;
}

export function App() {
  const [appState, setAppState] = useState(initialAppState);

  useEffect(() => {
    init().then(isSuccess => {
      isSuccess === true && setAppState({...appState, isLoading: false});
    });
  }, []);

  /*if (appState.isLoading) {
    return <Loader />;
  }*/

  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <MessengerScreen />
    </AppContext.Provider>
  );
}
