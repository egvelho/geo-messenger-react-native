import {Alert, TouchableOpacity} from 'react-native';
import {UserItem, UserItemProps} from './UserItem';
import styled from 'styled-components/native';

const ContactsListWrapper = styled.ScrollView`
  flex: 3;
  background-color: #fff;
`;

export type ContactsListProps = {
  isLandscape?: boolean;
  users: UserItemProps[];
  onItemPress: (user: UserItemProps) => Promise<void> | void;
};

export function ContactsList({
  users,
  onItemPress,
  isLandscape = false,
}: ContactsListProps) {
  return (
    <ContactsListWrapper
      style={
        isLandscape && {
          borderRightColor: '#ccc',
          borderRightWidth: 1,
        }
      }>
      {users.map((user, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onItemPress(user);
          }}>
          <UserItem {...user} showSeparator={index !== 0} />
        </TouchableOpacity>
      ))}
    </ContactsListWrapper>
  );
}
