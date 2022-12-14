import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Coords} from '@src/types';

const userInitialState = {
  id: '',
  name: '',
  color: '',
  token: undefined as string | undefined,
  coords: {
    latitude: 0,
    longitude: 0,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setName(state, action: PayloadAction<{name: string}>) {
      state.name = action.payload.name;
    },
    setId(state, action: PayloadAction<{id: string}>) {
      state.id = action.payload.id;
    },
    setColor(state, action: PayloadAction<{color: string}>) {
      state.color = action.payload.color;
    },
    setCoords(state, action: PayloadAction<{coords: Coords}>) {
      state.coords = action.payload.coords;
    },
    setToken(state, action: PayloadAction<{token: string}>) {
      state.token = action.payload.token;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
