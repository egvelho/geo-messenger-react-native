import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {ParamListBase} from '@react-navigation/native';
import {useContext, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker, MapMarker} from 'react-native-maps';
import {useListenUsersPositions} from '../../messenger/useListenUsersPositions';
import {UsersPositionsContext} from '../../messenger/UsersPositionsContext';
import {Avatar} from '../../components/Avatar';
import {AppContext} from '../../app/AppContext';
import mapStyleDark from '../../mapStyleDark.json';
import mapStyleLight from '../../mapStyleLight.json';
import screens from '../../screens.json';
import messengerScreens from '../messenger/messengerScreens.json';

const delta = 0.003;
const markerAnimationDuration = 1000;
const markerSize = 42;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export function HomeScreen({
  route,
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  const {appState} = useContext(AppContext);

  const mapStyle = appState.isDarkTheme ? mapStyleDark : mapStyleLight;
  const markersRef = useRef({} as {[key: string]: MapMarker | undefined});
  const {setUsersPositions} = useContext(UsersPositionsContext);

  const positions = useListenUsersPositions({
    user: appState.user,
    onChanged({coords, id}) {
      const marker = markersRef.current[id];
      marker &&
        marker.animateMarkerToCoordinate(coords, markerAnimationDuration);
    },
    onAdded({coords, id}) {
      const marker = markersRef.current[id];
      marker &&
        marker.animateMarkerToCoordinate(coords, markerAnimationDuration);
    },
    onRemoved({id}) {
      delete markersRef.current[id];
    },
  });

  useEffect(() => {
    setUsersPositions(positions);
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
        region={{
          ...appState.user.coords,
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
                onPress={() => {
                  navigation.navigate(screens.messenger, {
                    screen: messengerScreens.chat,
                    params: user,
                    initial: false,
                  });
                }}>
                <Avatar name={user.name} color={user.color} size={markerSize} />
              </Marker.Animated>
            ),
        )}
      </MapView>
    </MapContainer>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
