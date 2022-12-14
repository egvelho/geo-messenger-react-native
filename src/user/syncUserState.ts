import {ref, set, child} from 'firebase/database';
import {getFirebaseDatabaseSingleton} from '@src/firebase/getFirebaseDatabaseSingleton';
import {UserState} from '@src/types';

const firebaseSyncInterval = 10000;
let latestSyncTime = 0;

export async function syncUserState(user: UserState) {
  const syncTime = Date.now();
  if (latestSyncTime > syncTime - firebaseSyncInterval) {
    return;
  }
  latestSyncTime = syncTime;

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

  if (user.token !== undefined) {
    await set(child(dbRef, 'token'), user.token);
  }
}
