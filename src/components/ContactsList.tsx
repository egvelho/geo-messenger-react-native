import {Divider, Box, FlatList, Pressable} from 'native-base';
import {UserItem, UserItemProps} from './UserItem';

export type ContactsListProps = {
  users: UserItemProps[];
  onItemPress: (user: UserItemProps) => Promise<void> | void;
};

export function ContactsList({users, onItemPress}: ContactsListProps) {
  return (
    <Box height="full">
      <FlatList
        data={users}
        ItemSeparatorComponent={Divider}
        renderItem={user => (
          <Pressable
            _pressed={{
              bgColor: 'primary.100',
            }}
            onPress={() => {
              onItemPress(user.item);
            }}>
            <UserItem {...user.item} />
          </Pressable>
        )}
      />
    </Box>
  );
}
