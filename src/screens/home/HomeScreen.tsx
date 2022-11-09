import {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import MapView, {Marker} from 'react-native-maps';
import {useListenUsersPositions} from '../../messenger/useListenUsersPositions';
import {UsersPositionsContext} from '../../messenger/UsersPositionsContext';
import {AppContext} from '../../app/AppContext';

const delta = 0.003;

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

export function HomeScreen() {
  const {
    appState: {user},
  } = useContext(AppContext);

  const {setUsersPositions} = useContext(UsersPositionsContext);

  const positions = useListenUsersPositions({
    user,
    onChanged({coords, id}) {},
    onAdded({coords, id}) {},
    onRemoved({id}) {},
  });

  useEffect(() => {
    setUsersPositions(positions);
  }, [positions]);

  const positionsArray = Object.values(positions);

  return (
    <MapContainer>
      <MapView
        showsUserLocation
        style={styles.map}
        region={{
          ...user.coords,
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}>
        <Marker coordinate={user.coords} />
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
