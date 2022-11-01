import {View} from 'react-native';
import styled from 'styled-components/native';

export type MessageItemProps = {
  text: string;
  color: string;
  isMyself?: boolean;
};

const MessageWrapper = styled.View`
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
`;

const MessageText = styled.Text`
  font-size: 14px;
  color: #fff;
`;

export function MessageItem({text, color, isMyself}: MessageItemProps) {
  return (
    <MessageWrapper
      style={{
        backgroundColor: color,
        marginRight: isMyself ? '20%' : undefined,
        marginLeft: !isMyself ? '20%' : undefined,
      }}>
      <MessageText>{text}</MessageText>
    </MessageWrapper>
  );
}
