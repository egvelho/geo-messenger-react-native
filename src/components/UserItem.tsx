import {Avatar} from './Avatar';
import styled from 'styled-components/native';

const UserItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

const AvatarWrapper = styled.View`
  margin-right: 12px;
`;

const NameText = styled.Text`
  font-size: 24px;
`;

export type UserItemProps = {
  name: string;
};

export function UserItem({name}: UserItemProps) {
  return (
    <UserItemWrapper>
      <AvatarWrapper>
        <Avatar color="#000" name="Eduardo Velho" size={96} />
      </AvatarWrapper>
      <NameText>{name}</NameText>
    </UserItemWrapper>
  );
}
