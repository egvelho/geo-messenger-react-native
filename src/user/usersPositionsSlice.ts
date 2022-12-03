import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UsersPositions} from '@src/types';

const usersPositionsInitialState = {
  positions: {} as UsersPositions,
};

export const usersPositionsSlice = createSlice({
  name: 'usersPositions',
  initialState: usersPositionsInitialState,
  reducers: {
    addPosition(
      state,
      {payload}: PayloadAction<{id: string; user: UsersPositions[string]}>,
    ) {
      state.positions[payload.id] = payload.user;
    },
    removePosition(state, {payload: {id}}: PayloadAction<{id: string}>) {
      delete state.positions[id];
    },
    changePosition(
      state,
      {payload}: PayloadAction<{id: string; user: UsersPositions[string]}>,
    ) {
      state.positions[payload.id] = payload.user;
    },
    updateAllPositions(
      state,
      {payload: {positions}}: PayloadAction<{positions: UsersPositions}>,
    ) {
      state.positions = positions;
    },
  },
});

export const usersPositionsActions = usersPositionsSlice.actions;
export const usersPositionsReducer = usersPositionsSlice.reducer;
