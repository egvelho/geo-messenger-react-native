import {FlatList, Alert} from 'react-native';
import {useState, useEffect} from 'react';
import type {StackScreenProps} from '@react-navigation/stack';
import type {ParamListBase} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable, Center, Box, Spinner, Fab} from 'native-base';
import {FeedCard, FeedCardProps} from '@src/feed/components/FeedCard';
import {useLazyQuery} from '@src/utils/apolloClient';
import {queryGetFeedPage} from '@src/feed/queries/queryGetFeedPage';
import {useAppDispatch, useAppSelector, feedActions} from '@src/app/appStore';
import screens from '@src/screens/screens.json';

const pageSize = 9;

export function FeedListScreen({navigation}: StackScreenProps<ParamListBase>) {
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);
  const feed = useAppSelector(state => state.feed.feed);
  const dispatch = useAppDispatch();
  const [getFeedPage, {loading}] = useLazyQuery(queryGetFeedPage, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const nextPage = 1;
      const {data} = await getFeedPage({
        variables: {
          pageSize,
          page: nextPage,
        },
      });

      const feed = feedDecoder(data);
      dispatch(feedActions.setFeed({feed}));
    });

    return unsubscribe;
  }, [navigation]);

  async function onEndReached() {
    if (loading || endReached) {
      return;
    }

    const nextPage = page + 1;

    const {data} = await getFeedPage({
      variables: {
        pageSize,
        page: nextPage,
      },
    });
    const feed = feedDecoder(data);

    if (feed.length < pageSize) {
      setEndReached(true);
    }

    setPage(nextPage);
    dispatch(feedActions.addFeedPage({feed}));
  }

  return (
    <Center height="full">
      {feed.length > 0 && (
        <Box marginTop="4" flex="1">
          <FlatList
            data={feed}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  Alert.alert('', JSON.stringify(item, undefined, 2));
                }}>
                <FeedCard {...item} />
              </Pressable>
            )}
            onEndReached={onEndReached}
          />
        </Box>
      )}
      {loading && (
        <Center marginBottom="4">
          <Spinner size="lg" color="white" />
        </Center>
      )}
      <Fab
        renderInPortal={false}
        padding="1.5"
        onPress={() => navigation.navigate(screens.feed.add)}
        icon={<Icon name="add" size={32} />}
      />
    </Center>
  );
}

function feedDecoder(data: any): FeedCardProps[] {
  if (data === undefined) {
    return [];
  }

  const {data: feed} = data.feeds;
  const items = feed.map(
    ({attributes: {name, content, color, imageLink, image}}: any) => ({
      name,
      content,
      color,
      imageSrc: image.data
        ? `https://webservices.jumpingcrab.com${image.data.attributes.url}`
        : imageLink,
      coords: {latitude: 0, longitude: 0},
    }),
  );

  return items;
}
