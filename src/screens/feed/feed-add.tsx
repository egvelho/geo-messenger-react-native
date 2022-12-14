import {ScrollView} from 'react-native';
import {z} from 'zod';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
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
import {useAppSelector, appStore} from '@src/app/appStore';
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

const errorMessages = {
  imageLinkInvalid: 'Esse link de imagem não é válido.',
  required(field: string) {
    return `O campo "${field}" é obrigatório.`;
  },
  min(field: string, length: number) {
    return `O campo "${field}" precisa ter pelo menos ${length} letras.`;
  },
  max(field: string, length: number) {
    return `O campo "${field}" pode ter no máximo até ${length} letras.`;
  },
};

const urlRegex =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const messageMinLength = 16;
const messageMaxLength = 140;
const messageFieldName = texts.messageLabel.toLowerCase();
const imageLinkFieldName = texts.imageLinkLabel.toLowerCase();

const createPostSchema = z
  .object({
    message: z
      .string({
        required_error: errorMessages.required(messageFieldName),
      })
      .min(messageMinLength, {
        message: errorMessages.min(messageFieldName, messageMinLength),
      })
      .max(messageMaxLength, {
        message: errorMessages.max(messageFieldName, messageMaxLength),
      }),
    imageLink: z
      .string({
        required_error: errorMessages.required(imageLinkFieldName),
      })
      .regex(urlRegex, {
        message: errorMessages.imageLinkInvalid,
      }),
  })
  .transform(form => ({
    ...form,
    message: form.message.trim().replace(/\s\s+/g, ' '),
    imageLink: form.imageLink.trim(),
  }));

type CreatePostSchema = z.infer<typeof createPostSchema>;

export function FeedAddScreen({navigation}: StackScreenProps<ParamListBase>) {
  const toast = useToast();
  const [createPost, {loading}] = useMutation(mutationCreatePost);
  const user = useAppSelector(state => state.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  async function onSubmit({message, imageLink}: CreatePostSchema) {
    const {errors} = await createPost({
      variables: {
        name: user.name,
        content: message,
        color: user.color,
        imageLink: imageLink,
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
        <Column>
          <Center>
            <Avatar color={user.color} name={user.name} size={128} />
          </Center>
          <FormControl>
            <FormControl.Label isRequired>{texts.nameLabel}</FormControl.Label>
            <Input type="text" value={user.name} isDisabled />
          </FormControl>
          <FormControl isRequired isInvalid={'imageLink' in errors}>
            <FormControl.Label isRequired>
              {texts.imageLinkLabel}
            </FormControl.Label>
            <Controller
              name="imageLink"
              control={control}
              render={({field: {value, onBlur, onChange}}) => (
                <Input
                  type="text"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  isDisabled={loading}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.imageLink?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={'message' in errors}>
            <FormControl.Label isRequired>
              {texts.messageLabel}
            </FormControl.Label>
            <Controller
              name="message"
              control={control}
              render={({field: {value, onBlur, onChange}}) => (
                <TextArea
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCompleteType="off"
                  isDisabled={loading}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.message?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            marginTop="4"
            onPress={handleSubmit(onSubmit)}
            isDisabled={loading}
            isLoading={loading}>
            {texts.submitButton}
          </Button>
        </Column>
      </Box>
    </ScrollView>
  );
}
