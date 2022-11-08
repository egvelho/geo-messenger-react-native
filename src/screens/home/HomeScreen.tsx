import {useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import {useListenUsersPositions} from '../../messenger/useListenUsersPositions';
import {AppContext} from '../../app/AppContext';

const delta = 0.003;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export function HomeScreen() {
  const {
    appState: {coords},
  } = useContext(AppContext);
  const positions = useListenUsersPositions();
  const positionsArray = Object.values(positions);

  return (
    <MapContainer>
      <MapView
        showsUserLocation
        style={styles.map}
        region={{
          ...coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        <Marker coordinate={coords} />
        {positionsArray.map(position => (
          <Marker coordinate={position.coords} key={position.id} />
        ))}
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
