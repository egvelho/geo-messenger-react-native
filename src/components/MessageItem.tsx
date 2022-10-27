import {View} from 'react-native';
import styled from 'styled-components/native';

export type MessageItemProps = {
  text: string;
  color: string;
  myself?: boolean;
};

const MessageWrapper = styled.View`
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
`;

const MessageText = styled.Text`
  font-size: 18px;
`;

export function MessageItem({text, color, myself}: MessageItemProps) {
  return (
    <MessageWrapper
      style={{
        backgroundColor: color,
        marginRight: myself ? '20%' : undefined,
        marginLeft: !myself ? '20%' : undefined,
      }}>
      <MessageText>{text}</MessageText>
    </MessageWrapper>
  );
}
