import {useContext} from 'react';
import {AppContext} from '../../app/AppContext';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {Avatar} from '../../components/Avatar';
import {generateRandomColor} from '../../utils/generateRandomColor';

export function ProfileScreen() {
  const {appState, setAppState} = useContext(AppContext);

  return (
    <View style={styles.profileWrapper}>
      <Avatar size={96} name={appState.user.name} color={appState.user.color} />
      <TextInput
        placeholder="Nome completo"
        style={styles.nameInputText}
        value={appState.user.name}
        onChangeText={name => {
          setAppState({
            ...appState,
            user: {
              ...appState.user,
              name,
            },
          });
        }}
      />
      <View style={styles.randomColorButton}>
        <Button
          color={appState.user.color}
          title="Escolher cor aleatória"
          onPress={() => {
            setAppState({
              ...appState,
              user: {
                ...appState.user,
                color: generateRandomColor(),
              },
            });
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
