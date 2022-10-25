import {PermissionsAndroid} from 'react-native';

export async function requestPermission() {
  const response = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (response !== 'granted') {
    return false;
  }

  return true;
}
