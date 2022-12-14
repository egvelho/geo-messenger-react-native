import {View, ActivityIndicator, StyleSheet} from 'react-native';

export type AppLoaderProps = {
  dark?: boolean;
};

export function AppLoader({dark = false}: AppLoaderProps) {
  return (
    <View
      style={[
        styles.loaderWrapper,
        {
          backgroundColor: dark ? '#ff0000' : '#00ff00',
        },
      ]}>
      <ActivityIndicator size={64} color={dark ? '#00ff00' : '#ff0000'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
