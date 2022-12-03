import 'react-native-gesture-handler';
import {useEffect, useMemo} from 'react';
import {requestPermission} from '@src/geolocation/requestPermission';
import {getCoords} from '@src/geolocation/getCoords';
import {watchGeolocation} from '@src/geolocation/watchGeolocation';
import {syncUserState} from '@src/user/syncUserState';
import {generateRandomColor} from '@src/utils/generateRandomColor';
import {generateUserId} from '@src/utils/generateUserId';
import {AppLoader} from './AppLoader';
import {
  useAppDispatch,
  useAppSelector,
  appActions,
  userActions,
} from './appStore';

export type AppInitProviderProps = {
  children: React.ReactNode;
};

async function init() {
  while ((await requestPermission()) === false) {}
  while (true) {
    const coords = await getCoords();
    if (coords !== undefined) {
      return {coords};
    }
  }
}

export function AppInitProvider({children}: AppInitProviderProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);

  useEffect(() => {
    init().then(({coords}) => {
      dispatch(userActions.setCoords({coords}));
      dispatch(appActions.setLoading({isLoading: false}));
    });
  }, []);

  if (isLoading) {
    return <AppLoader dark={isDarkTheme} />;
  }

  return <AfterLoad>{children}</AfterLoad>;
}

function AfterLoad({children}: AppInitProviderProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (user.id.length === 0) {
      dispatch(userActions.setId({id: generateUserId()}));
    }

    if (user.color.length === 0) {
      dispatch(userActions.setColor({color: generateRandomColor()}));
    }

    const {clearWatchId} = watchGeolocation({
      onPositionChange(coords) {
        dispatch(userActions.setCoords({coords}));
      },
    });

    return clearWatchId;
  }, []);

  useEffect(() => {
    syncUserState(user);
  }, [user]);

  //const memoChildren = useMemo(() => <>{children}</>, [children]);
  return <>{children}</>;
}
