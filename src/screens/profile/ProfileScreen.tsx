import {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Avatar} from '../../components/Avatar';
import {generateRandomColor} from '../../utils/generateRandomColor';

export function ProfileScreen() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('black');

  return (
    <View style={styles.profileWrapper}>
      <Avatar size={96} name={name} color={color} />
      <TextInput
        style={styles.nameInputText}
        value={name}
        onChangeText={name => {
          setName(name);
        }}
      />
      <View style={styles.randomColorButton}>
        <Button
          title="Escolher cor aleatória"
          onPress={() => {
            setColor(generateRandomColor());
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
  },
  nameInputText: {
    marginTop: 8,
    backgroundColor: '#ccc',
    width: '100%',
  },
  randomColorButton: {
    marginTop: 8,
  },
});
