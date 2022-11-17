import {Avatar as BaseAvatar} from 'native-base';
import {View, Text, StyleSheet, Image, ImageProps} from 'react-native';

export type AvatarProps = {
  size: number;
  color: string;
  name: string;
  source?: ImageProps['source'];
};

export function Avatar({size, color, name, source}: AvatarProps) {
  return (
    <BaseAvatar
      bgColor={color}
      size={`${size}px`}
      source={source}
      _text={{
        fontSize: `${size * 0.4}px`,
      }}>
      {getInitials(name)}
    </BaseAvatar>
  );
}

function getInitials(name: string) {
  const splittedName = name.trim().toUpperCase().split(' ');
  const firstName = splittedName[0] || '';
  const lastName = splittedName[splittedName.length - 1] || '';

  if (splittedName.length > 1 && firstName.length > 0 && lastName.length > 0) {
    return firstName[0].concat(lastName[0]);
  } else if (firstName.length > 0) {
    return firstName[0].concat(firstName[firstName.length - 1]);
  } else {
    return '??';
  }
}
