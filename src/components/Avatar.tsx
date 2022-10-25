import {View, Text, StyleSheet} from 'react-native';

export type AvatarProps = {
  size: number;
  color: string;
  name: string;
};

export function Avatar({size, color, name}: AvatarProps) {
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
      <Text style={styles.initialsText}>{getInitials(name)}</Text>
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
  const splitedName = name.split(' ');
  const firstName = splitedName[0];
  const lastName = splitedName[splitedName.length - 1];
  if (!firstName) {
    return '??';
  } else if (!lastName) {
    return `${firstName[0]}${firstName[1]}`.toUpperCase();
  }

  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
