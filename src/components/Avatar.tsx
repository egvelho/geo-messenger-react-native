import {View, Text, StyleSheet, Image, ImageProps} from 'react-native';

export type AvatarProps = {
  size: number;
  color: string;
  name: string;
  source?: ImageProps['source'];
};

export function Avatar({size, color, name, source}: AvatarProps) {
  const child = source ? (
    <Image
      source={source}
      style={{width: size, height: size, borderRadius: size / 2}}
    />
  ) : (
    <Text style={styles.initialsText}>{getInitials(name)}</Text>
  );

  return (
    <View
      style={[
        styles.avatarWrapper,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
        },
      ]}>
      {child}
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    borderWidth: 5,
    borderColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});

function getInitials(name: string) {
  const splittedName = name.trim().toUpperCase().split(' ');
  const firstName = splittedName[0] ?? '';
  const lastName = splittedName[splittedName.length - 1] ?? '';

  if (firstName.length > 0 && lastName.length > 0) {
    return firstName[0].concat(lastName[0]);
  } else if (firstName.length > 0) {
    return firstName[0].concat(firstName[firstName.length - 1]);
  } else {
    return '??';
  }
}
