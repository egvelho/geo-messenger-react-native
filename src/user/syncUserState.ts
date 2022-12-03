import {ref, set, child} from 'firebase/database';
import {getFirebaseDatabaseSingleton} from '@src/firebase/getFirebaseDatabaseSingleton';
import {debounce} from '@src/utils/debouce';
import {UserState} from '@src/types';

const firebaseSyncInterval = 10000;

export const syncUserState = debounce(async (user: UserState) => {
  if (
    user.color.length === 0 ||
    user.id.length === 0 ||
    user.name.length === 0 ||
    user.coords.latitude === 0 ||
    user.coords.longitude === 0
  ) {
    return;
  }

  const db = getFirebaseDatabaseSingleton();
  const dbRef = ref(db, `positions/${user.id}`);
  await set(child(dbRef, 'name'), user.name);
  await set(child(dbRef, 'color'), user.color);
  await set(child(dbRef, 'coords'), user.coords);
  await set(child(dbRef, 'id'), user.id);
}, firebaseSyncInterval);
