import Geolocation, {
  GeoWatchOptions,
  GeoCoordinates,
} from 'react-native-geolocation-service';

const options: GeoWatchOptions = {
  enableHighAccuracy: true,
  interval: 2000,
  distanceFilter: 3,
  showLocationDialog: false,
  forceRequestLocation: true,
};

export function watchGeolocation({
  onPositionChange,
}: {
  onPositionChange: (position: GeoCoordinates) => Promise<void> | void;
}) {
  const watchId = Geolocation.watchPosition(
    position => position.coords && onPositionChange(position.coords),
    console.log,
    options,
  );

  return {
    clearWatchId: () => Geolocation.clearWatch(watchId),
  };
}
