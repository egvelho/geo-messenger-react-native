import {Box} from 'native-base';

export type MessageItemProps = {
  text: string;
  color: string;
  isMyself?: boolean;
};

export function MessageItem({text, color, isMyself}: MessageItemProps) {
  return (
    <Box
      borderRadius="4"
      bgColor={color}
      padding="2"
      margin="2"
      marginRight={isMyself ? '1/4' : undefined}
      marginLeft={!isMyself ? '1/4' : undefined}
      _text={{
        color: 'white',
        fontSize: 'sm',
      }}>
      {text}
    </Box>
  );
}
