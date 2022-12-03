import {Divider, Box, FlatList, Pressable, Text} from 'native-base';
import {UserItem, UserItemProps} from '@src/components/UserItem';

export type ContactsListProps = {
  users: UserItemProps[];
  onItemPress: (user: UserItemProps) => Promise<void> | void;
};

const texts = {
  emptyContactsListMessage: 'Ninguém por aqui ainda.',
};

export function ContactsList({users, onItemPress}: ContactsListProps) {
  return (
    <Box height="full">
      <FlatList
        data={users}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <Text fontSize="xl" textAlign="center">
            {texts.emptyContactsListMessage}
          </Text>
        }
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
