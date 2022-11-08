import {TouchableOpacity, FlatList} from 'react-native';
import {UserItem, UserItemProps} from './UserItem';
import styled from 'styled-components/native';

const ContactsListWrapper = styled.View`
  flex: 3;
  background-color: #fff;
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #ccc;
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
      <FlatList
        data={users}
        ItemSeparatorComponent={Separator}
        renderItem={user => (
          <TouchableOpacity
            onPress={() => {
              onItemPress(user.item);
            }}>
            <UserItem {...user.item} />
          </TouchableOpacity>
        )}
      />
    </ContactsListWrapper>
  );
}
