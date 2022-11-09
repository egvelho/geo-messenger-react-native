export type UserState = {
  id: string;
  name: string;
  color: string;
  coords: Coords;
};

export type Coords = {
  latitude: number;
  longitude: number;
};

export type UsersPositions = {[key: string]: UserState};

export type Message = {
  senderId: string;
  text: string;
  timestamp: number;
};

export type AppState = {
  isLoading: boolean;
  user: UserState;
};
