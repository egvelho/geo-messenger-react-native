import {Avatar} from './Avatar';
import styled from 'styled-components/native';
import {UserState} from '../types';

const UserItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
`;

const AvatarWrapper = styled.View`
  margin-right: 8px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

export type UserItemProps = UserState;

export function UserItem({name, color}: UserItemProps) {
  return (
    <UserItemWrapper>
      <AvatarWrapper>
        <Avatar color={color} name={name} size={56} />
      </AvatarWrapper>
      <NameText>{name}</NameText>
    </UserItemWrapper>
  );
}
