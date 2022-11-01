import {createContext} from 'react';
import {UserState} from '../types';

export type AppState = {
  isLoading: boolean;
  user: UserState;
};

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: '',
    name: '',
    color: '',
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});
