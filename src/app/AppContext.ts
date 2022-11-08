import {createContext} from 'react';
import {UserState} from '../types';

export type AppState = {
  isLoading: boolean;
  user: UserState;
  coords: {
    latitude: number;
    longitude: number;
  };
};

export const initialAppState: AppState = {
  isLoading: true,
  coords: {
    latitude: 0,
    longitude: 0,
  },
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
