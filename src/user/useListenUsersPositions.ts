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

const updateInterval = 5000;

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
      if (snapshot.exists() && snapshot.key && snapshot.key !== user?.id) {
        const nextPosition = snapshot.val();
        positionsRef.current[snapshot.key] = nextPosition;
        onChanged && onChanged(nextPosition);
      }
    });

    const unsubscribeOnChildAdded = onChildAdded(dbRef, snapshot => {
      if (snapshot.exists() && snapshot.key && snapshot.key !== user?.id) {
        const nextPosition = snapshot.val();
        positionsRef.current[snapshot.key] = nextPosition;
        onAdded && onAdded(nextPosition);
      }
    });

    const unsubscribeOnChildRemoved = onChildRemoved(dbRef, snapshot => {
      if (snapshot.key && snapshot.key !== user?.id) {
        delete positionsRef.current[snapshot.key];
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
