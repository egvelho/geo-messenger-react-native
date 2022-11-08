import Geolocation, {
  GeoWatchOptions,
  GeoPosition,
} from 'react-native-geolocation-service';

const options: GeoWatchOptions = {
  enableHighAccuracy: true,
  interval: 2000,
  distanceFilter: 3,
};

export function watchGeolocation({
  onPositionChange,
}: {
  onPositionChange: (position: GeoPosition) => Promise<void> | void;
}) {
  const watchId = Geolocation.watchPosition(
    onPositionChange,
    undefined,
    options,
  );

  return {
    clearWatchId: () => Geolocation.clearWatch(watchId),
  };
}
