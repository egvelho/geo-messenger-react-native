import {
  View,
  useWindowDimensions,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {UserItem} from '../../components/UserItem';
import {MessageItem} from '../../components/MessageItem';
import styled from 'styled-components/native';

const ContactsList = styled.ScrollView`
  flex: 1;
  background-color: red;
`;

const ChatView = styled.ScrollView`
  flex: 2;
  background-color: green;
`;

const MessengerWrapper = styled.View`
  height: 100%;
  background-color: red;
`;

export function MessengerScreen() {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  const users = Array.from({length: 30}, (_, index) => `User ${index}`);
  const messages = Array.from({length: 50}, (_, index) => ({
    myself: Math.random() > 0.5,
    text: `Texto ${index}`,
  }));

  return (
    <MessengerWrapper style={{flexDirection: isLandscape ? 'row' : 'column'}}>
      <ContactsList>
        {users.map(user => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('User', user);
            }}>
            <UserItem name={user} />
          </TouchableOpacity>
        ))}
      </ContactsList>
      {isLandscape && (
        <ChatView>
          {messages.map(({myself, text}) => (
            <MessageItem myself={myself} text={text} color="blue" />
          ))}
        </ChatView>
      )}
    </MessengerWrapper>
  );
}
