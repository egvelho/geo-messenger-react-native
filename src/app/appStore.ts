import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {userReducer} from '@src/user/userSlice';
import {usersPositionsReducer} from '@src/user/usersPositionsSlice';
import {appReducer} from './appSlice';

export {Provider as AppStoreProvider} from 'react-redux';
export {PersistGate as AppStorePersistGate} from 'redux-persist/integration/react';
export {userActions} from '@src/user/userSlice';
export {usersPositionsActions} from '@src/user/usersPositionsSlice';
export {appActions} from './appSlice';

const persistConfig = {
  storage: AsyncStorage,
};

const persistedAppReducer = persistReducer(
  {
    ...persistConfig,
    key: 'app',
    blacklist: ['isLoading'],
  },
  appReducer,
);

const persistedUserReducer = persistReducer(
  {
    ...persistConfig,
    key: 'user',
  },
  userReducer,
);

export const appStore = configureStore({
  reducer: {
    app: persistedAppReducer,
    user: persistedUserReducer,
    usersPositions: usersPositionsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const appPersistor = persistStore(appStore);

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
