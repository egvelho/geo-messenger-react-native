import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const appInitialState = {
  isLoading: true,
  isDarkTheme: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setLoading(state, action: PayloadAction<{isLoading: boolean}>) {
      state.isLoading = action.payload.isLoading;
    },
    setDarkTheme(state, action: PayloadAction<{isDarkTheme: boolean}>) {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
