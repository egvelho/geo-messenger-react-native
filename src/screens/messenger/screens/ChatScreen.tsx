import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {ChatView} from '../../../components/ChatView';
import {generateRandomColor} from '../../../utils/generateRandomColor';
import {UserState} from '../../../types';

const messages = Array.from({length: 50}, (_, index) => ({
  isMyself: Math.random() > 0.5,
  text: `Texto ${index}`,
  color: generateRandomColor(),
}));

export function ChatScreen({
  route,
  navigation,
}: StackScreenProps<ParamListBase>) {
  const stranger = route.params as UserState;

  return <ChatView messages={messages} />;
}
