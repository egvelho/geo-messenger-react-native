import {Alert} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {ChatView} from '../../../components/ChatView';
import {generateRandomColor} from '../../../utils/generateRandomColor';

export function ChatScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  Alert.alert('Teste', JSON.stringify(route.params, undefined, 2));

  const messages = Array.from({length: 50}, (_, index) => ({
    isMyself: Math.random() > 0.5,
    text: `Texto ${index}`,
    color: generateRandomColor(),
  }));

  return <ChatView messages={messages} />;
}
