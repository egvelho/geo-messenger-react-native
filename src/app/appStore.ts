import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
export {Provider as AppStoreProvider} from 'react-redux';
import {userReducer} from '@src/user/userSlice';
import {usersPositionsReducer} from '@src/user/usersPositionsSlice';
import {appReducer} from './appSlice';

export {userActions} from '@src/user/userSlice';
export {usersPositionsActions} from '@src/user/usersPositionsSlice';
export {appActions} from './appSlice';

export const appStore = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    usersPositions: usersPositionsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
