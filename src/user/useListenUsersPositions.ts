import {useState, useEffect, useRef} from 'react';
import {
  ref,
  get,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
} from 'firebase/database';
import {getFirebaseDatabaseSingleton} from '../firebase/getFirebaseDatabaseSingleton';
import {UsersPositions, UserState} from '../types';

const updateInterval = 15000;
const changeInterval = 10000;
const minChangeInterval = 3000;

export type UseListenUsersPositionsArgs = {
  user?: UserState;
  onChanged?: (positions: UserState) => Promise<void> | void;
  onAdded?: (positions: UserState) => Promise<void> | void;
  onRemoved?: (positions: {id: string}) => Promise<void> | void;
};

export function useListenUsersPositions({
  user,
  onChanged,
  onAdded,
  onRemoved,
}: UseListenUsersPositionsArgs = {}) {
  const positionsRef = useRef({} as UsersPositions);
  const keysRef = useRef({} as {[key: string]: number});
  const latestChangeTimeRef = useRef(0);
  const [positions, setPositions] = useState({} as UsersPositions);

  useEffect(() => {
    const db = getFirebaseDatabaseSingleton();
    const dbRef = ref(db, 'positions');

    get(dbRef).then(snapshot => {
      if (snapshot.exists()) {
        let nextPositions = snapshot.val();
        user?.id && delete nextPositions[user.id];
        setPositions(nextPositions);
      }
    });

    const unsubscribeOnChildChanged = onChildChanged(dbRef, snapshot => {
      const currentTime = Date.now();

      if (latestChangeTimeRef.current > currentTime - minChangeInterval) {
        return;
      }

      latestChangeTimeRef.current = currentTime;

      if (snapshot.exists() && snapshot.key && snapshot.key !== user?.id) {
        if (keysRef.current[snapshot.key] > currentTime - changeInterval) {
          return;
        }

        const nextPosition = snapshot.val();
        keysRef.current[snapshot.key] = currentTime;
        positionsRef.current[snapshot.key] = nextPosition;
        onChanged && onChanged(nextPosition);
      }
    });

    const unsubscribeOnChildAdded = onChildAdded(dbRef, snapshot => {
      if (snapshot.exists() && snapshot.key && snapshot.key !== user?.id) {
        const nextPosition = snapshot.val();
        positionsRef.current[snapshot.key] = nextPosition;
        keysRef.current[snapshot.key] = Date.now();
        onAdded && onAdded(nextPosition);
      }
    });

    const unsubscribeOnChildRemoved = onChildRemoved(dbRef, snapshot => {
      if (snapshot.key && snapshot.key !== user?.id) {
        delete positionsRef.current[snapshot.key];
        delete keysRef.current[snapshot.key];
        onRemoved && onRemoved({id: snapshot.key});
      }
    });

    const updateIntervalId = setInterval(() => {
      setPositions({...positionsRef.current});
    }, updateInterval);

    return () => {
      unsubscribeOnChildChanged();
      unsubscribeOnChildAdded();
      unsubscribeOnChildRemoved();
      clearInterval(updateIntervalId);
    };
  }, []);

  return positions;
}
