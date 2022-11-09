import {createContext} from 'react';
import type {AppState} from '../types';

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
