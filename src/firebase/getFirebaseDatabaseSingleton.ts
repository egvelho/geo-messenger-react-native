import {initializeApp} from 'firebase/app';
import {getDatabase, Database as FirebaseDatabase} from 'firebase/database';
import firebaseConfig from './firebaseConfig.json';

let firebaseDatabase: FirebaseDatabase | undefined = undefined;

export function getFirebaseDatabaseSingleton() {
  if (firebaseDatabase === undefined) {
    const firebaseApp = initializeApp(firebaseConfig);
    firebaseDatabase = getDatabase(firebaseApp);
  }

  return firebaseDatabase;
}
