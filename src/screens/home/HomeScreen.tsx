import {Text} from 'react-native';
import {useListenUsersPositions} from '../../messenger/useListenUsersPositions';

export function HomeScreen() {
  const positions = useListenUsersPositions();
  return <Text>{JSON.stringify(positions, undefined, 2)}</Text>;
}
