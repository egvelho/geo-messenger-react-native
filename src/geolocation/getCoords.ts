import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

export function getCoords(): Promise<GeoCoordinates | undefined> {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        position?.coords && resolve(position.coords);
      },
      error => {
        resolve(undefined);
      },
    );
  });
}
