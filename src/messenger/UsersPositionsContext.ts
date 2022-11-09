import {createContext} from 'react';
import {UsersPositions} from '../types';

const initialUsersPositionsContext: UsersPositions = {};

export const UsersPositionsContext = createContext({
  usersPositions: initialUsersPositionsContext,
  setUsersPositions: (positions: UsersPositions) => {},
});
