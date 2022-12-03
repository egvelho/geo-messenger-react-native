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
          backgroundColor: dark ? '#101010' : '#f0f0f0',
        },
      ]}>
      <ActivityIndicator size={64} color={dark ? '#f0f0f0' : '#101010'} />
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
