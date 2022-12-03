import {useRef, useEffect, memo} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, MapMarker} from 'react-native-maps';
import {useListenUsersPositions} from '@src/user/useListenUsersPositions';
import {usersPositionsActions, useAppDispatch} from '@src/app/appStore';
import {Avatar} from '@src/components/Avatar';
import {UserState} from '@src/types';
import mapStyleDark from './mapStyleDark.json';
import mapStyleLight from './mapStyleLight.json';

const delta = 0.003;
const markerSize = 42;
const markerAnimationDuration = 1000;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export type UsersMapProps = {
  isDarkMap?: boolean;
  user: UserState;
  onMarkerPress: (user: UserState) => void;
};

export const UsersMap = memo(
  ({user, onMarkerPress, isDarkMap = false}: UsersMapProps) => {
    const dispatch = useAppDispatch();
    const mapStyle = isDarkMap ? mapStyleDark : mapStyleLight;
    const markersRef = useRef({} as {[key: string]: MapMarker | undefined});
    const positions = useListenUsersPositions({
      user,
      onChanged(user) {
        const marker = markersRef.current[user.id];
        marker &&
          marker.animateMarkerToCoordinate(
            user.coords,
            markerAnimationDuration,
          );
      },
      onAdded(user) {
        const marker = markersRef.current[user.id];
        marker &&
          marker.animateMarkerToCoordinate(
            user.coords,
            markerAnimationDuration,
          );
      },
      onRemoved({id}) {
        delete markersRef.current[id];
      },
    });

    useEffect(() => {
      dispatch(usersPositionsActions.updateAllPositions({positions}));
    }, [positions]);

    const positionsArray = Object.values(positions);

    return (
      <MapContainer>
        <MapView
          showsUserLocation
          showsBuildings={false}
          showsIndoors={false}
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
          customMapStyle={mapStyle}
          style={styles.map}
          initialRegion={{
            ...user.coords,
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}>
          {positionsArray.map(
            user =>
              user?.id &&
              user?.coords && (
                <Marker.Animated
                  coordinate={user.coords}
                  key={user.id}
                  ref={(marker: MapMarker) =>
                    (markersRef.current[user.id as string] = marker)
                  }
                  onPress={() => onMarkerPress(user)}>
                  <Avatar
                    name={user.name}
                    color={user.color}
                    size={markerSize}
                  />
                </Marker.Animated>
              ),
          )}
        </MapView>
      </MapContainer>
    );
  },
  () => false,
);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
