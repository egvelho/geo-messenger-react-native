import AsyncStorage from '@react-native-async-storage/async-storage';
import {faker} from '@faker-js/faker';
import {AppState} from '../types';
import {debounce} from '../utils/debouce';
import {generateRandomColor} from '../utils/generateRandomColor';
import {generateUserId} from '../utils/generateUserId';

const storagePath = 'app';
const writeUserToStorageInterval = 2000;

export class AppStorage {
  static async getStorage(): Promise<AppState> {
    const storage = await AsyncStorage.getItem(storagePath);
    if (storage) {
      return JSON.parse(storage);
    }

    const initialState = await AppStorage.getInitialState();
    await AppStorage.setStorage(initialState);
    return initialState;
  }

  static async setStorage(state: AppState) {
    return AsyncStorage.setItem(storagePath, JSON.stringify(state));
  }

  static getInitialState(): AppState {
    return {
      isLoading: true,
      user: {
        id: generateUserId(),
        name: faker.name.fullName(),
        color: generateRandomColor(),
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
    };
  }

  static syncAppStorage = debounce(async (appState: AppState) => {
    if (appState.isLoading === true || appState.user.id.length === 0) {
      return;
    }

    await AppStorage.setStorage(appState);
  }, writeUserToStorageInterval);
}
