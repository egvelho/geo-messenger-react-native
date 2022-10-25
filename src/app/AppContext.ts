import {createContext} from 'react';

export type AppState = {
  isLoading: boolean;
  user: {
    id: string;
    name: string;
    color: string;
  };
  coords: {
    latitude: number;
    longitude: number;
  };
};

export const initialAppState: AppState = {
  isLoading: true,
  user: {
    id: '',
    name: '',
    color: '',
  },
  coords: {
    latitude: 0,
    longitude: 0,
  },
};

export const AppContext = createContext({
  appState: initialAppState,
  setAppState: (state: AppState) => {},
});
