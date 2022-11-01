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
        placeholder="Nome completo"
        style={styles.nameInputText}
        value={name}
        onChangeText={name => {
          setName(name);
        }}
      />
      <View style={styles.randomColorButton}>
        <Button
          color={color}
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
    backgroundColor: '#eee',
    height: '100%',
  },
  nameInputText: {
    marginTop: 16,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
  },
  randomColorButton: {
    width: '100%',
    marginTop: 16,
  },
});
