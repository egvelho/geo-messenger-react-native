import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {useAppSelector} from './appStore';

export type AppLayoutProviderProps = {
  children: React.ReactNode;
};

export function AppLayoutProvider({children}: AppLayoutProviderProps) {
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const baseNavigationTheme = isDarkTheme ? DarkTheme : DefaultTheme;

  const nativeBaseTheme = extendTheme({
    config: {
      initialColorMode: isDarkTheme ? 'dark' : 'light',
    },
  });

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: nativeBaseTheme.colors.primary[800],
    },
  };

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <NavigationContainer theme={navigationTheme}>
        {children}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
