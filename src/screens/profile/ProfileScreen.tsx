import {useContext} from 'react';
import {Button, Column, Input, useColorMode} from 'native-base';
import {AppContext} from '../../app/AppContext';
import {Avatar} from '../../components/Avatar';
import {generateRandomColor} from '../../utils/generateRandomColor';

export function ProfileScreen() {
  const {toggleColorMode} = useColorMode();
  const {appState, setAppState} = useContext(AppContext);

  return (
    <Column
      alignItems="center"
      justifyContent="center"
      space="4"
      padding="4"
      height="full">
      <Avatar size={96} name={appState.user.name} color={appState.user.color} />
      <Input
        placeholder="Nome completo"
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
      <Button
        width="full"
        bgColor={appState.user.color}
        onPress={() => {
          setAppState({
            ...appState,
            user: {
              ...appState.user,
              color: generateRandomColor(),
            },
          });
        }}>
        Escolher cor aleatória
      </Button>
      <Button
        width="full"
        onPress={() => {
          setAppState({
            ...appState,
            isDarkTheme: !appState.isDarkTheme,
          });
          toggleColorMode();
        }}>
        Trocar tema global
      </Button>
    </Column>
  );
}
