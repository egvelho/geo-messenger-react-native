import {Button, Column, Input, useColorMode} from 'native-base';
import {Avatar} from '@src/components/Avatar';
import {generateRandomColor} from '@src/utils/generateRandomColor';
import {
  userActions,
  appActions,
  useAppDispatch,
  useAppSelector,
} from '@src/app/appStore';

const texts = {
  changeColorButton: 'Escolher cor aleatória',
  changeThemeButton: 'Trocar tema global',
};

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(state => state.user.name);
  const color = useAppSelector(state => state.user.color);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const {toggleColorMode} = useColorMode();

  return (
    <Column
      alignItems="center"
      justifyContent="center"
      space="4"
      padding="4"
      height="full">
      <Avatar size={96} name={name} color={color} />
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={name => {
          dispatch(
            userActions.setName({
              name,
            }),
          );
        }}
      />
      <Button
        width="full"
        bgColor={color}
        onPress={() =>
          dispatch(
            userActions.setColor({
              color: generateRandomColor(),
            }),
          )
        }>
        {texts.changeColorButton}
      </Button>
      <Button
        width="full"
        onPress={() => {
          toggleColorMode();
          dispatch(
            appActions.setDarkTheme({
              isDarkTheme: !isDarkTheme,
            }),
          );
        }}>
        {texts.changeThemeButton}
      </Button>
    </Column>
  );
}
