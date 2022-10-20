import {useState, useEffect} from 'react';
import {View, Text, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Loading} from './Loading';

const initialLoadingState = true;

export default function App() {
  const [isLoading, setIsLoading] = useState(initialLoadingState);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <Icon name="facebook" size={90} color="#ff0000" />
    </View>
  );
}
