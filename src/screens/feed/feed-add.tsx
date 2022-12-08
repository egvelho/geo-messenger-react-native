import {useState} from 'react';
import {ScrollView} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import {
  Box,
  Center,
  Input,
  TextArea,
  FormControl,
  Column,
  Button,
  useToast,
} from 'native-base';
import {Avatar} from '@src/components/Avatar';
import {useAppSelector} from '@src/app/appStore';
import {useMutation} from '@apollo/client';
import {mutationCreatePost} from '@src/feed/queries/mutationCreatePost';
import screens from '@src/screens/screens.json';

const texts = {
  nameLabel: 'Usuário',
  messageLabel: 'Mensagem',
  imageLinkLabel: 'Link da imagem',
  submitButton: 'Enviar',
  errorToast: 'Houve um erro ao criar a publicação',
  successToast: 'Publicação criada com sucesso',
};

export function FeedAddScreen({navigation}: StackScreenProps<ParamListBase>) {
  const toast = useToast();
  const [createPost, {loading}] = useMutation(mutationCreatePost);
  const user = useAppSelector(state => state.user);
  const [message, setMessage] = useState('');
  const [imageLink, setImageLink] = useState('');

  async function onSubmit() {
    const {errors} = await createPost({
      variables: {
        name: user.name,
        content: message.trim(),
        color: user.color,
        imageLink,
      },
    });

    if (errors) {
      toast.show({
        description: texts.errorToast,
        backgroundColor: 'error.500',
      });
    } else {
      toast.show({
        description: texts.successToast,
        backgroundColor: 'success.500',
      });
      navigation.navigate(screens.feed.list);
    }
  }

  return (
    <ScrollView>
      <Box height="full" margin="4">
        <FormControl>
          <Column>
            <Center>
              <Avatar color={user.color} name={user.name} size={128} />
            </Center>
            <FormControl.Label isRequired>{texts.nameLabel}</FormControl.Label>
            <Input type="text" value={user.name} isDisabled />
            <FormControl.Label isRequired>
              {texts.imageLinkLabel}
            </FormControl.Label>
            <Input
              type="text"
              value={imageLink}
              onChangeText={setImageLink}
              isDisabled={loading}
            />
            <FormControl.Label isRequired>
              {texts.messageLabel}
            </FormControl.Label>
            <TextArea
              value={message}
              onChangeText={setMessage}
              autoCompleteType="off"
              isDisabled={loading}
            />
            <Button
              marginTop="4"
              onPress={onSubmit}
              isDisabled={loading}
              isLoading={loading}>
              {texts.submitButton}
            </Button>
          </Column>
        </FormControl>
      </Box>
    </ScrollView>
  );
}
