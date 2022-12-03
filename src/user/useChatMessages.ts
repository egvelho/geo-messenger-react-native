import {useEffect, useState, useRef} from 'react';
import {
  ref,
  set,
  query,
  child,
  onValue,
  orderByKey,
  DatabaseReference,
} from 'firebase/database';
import {getFirebaseDatabaseSingleton} from '@src/firebase/getFirebaseDatabaseSingleton';
import type {UserState, Message} from '@src/types';

export type UseChatMessageProps = {
  myself: UserState;
  stranger: UserState;
};

export function useChatMessages({myself, stranger}: UseChatMessageProps) {
  const messagesDbRef = useRef<DatabaseReference>();
  const unsubscribeRef = useRef(() => {});
  const [messages, setMessages] = useState([] as Message[]);

  const sendMessage = (message: Message) =>
    messagesDbRef.current &&
    set(child(messagesDbRef.current, message.timestamp.toString()), message);

  function subscribe() {
    const path = [myself.id, stranger.id].sort().join('-');
    const db = getFirebaseDatabaseSingleton();
    const dbRef = ref(db, `messages/${path}`);
    const dbQuery = query(dbRef, orderByKey());
    messagesDbRef.current = dbRef;

    const unsubscribeOnValue = onValue(dbQuery, snapshot => {
      if (snapshot.exists()) {
        const nextMessages = Object.values<Message>(snapshot.val());
        setMessages(nextMessages);
      }
    });
    unsubscribeRef.current = unsubscribeOnValue;
    return unsubscribeOnValue;
  }

  useEffect(() => {
    subscribe();
  }, []);

  useEffect(() => {
    unsubscribeRef.current();
    subscribe();
  }, [stranger]);

  return {
    messages,
    sendMessage,
    unsubscribe: unsubscribeRef.current,
  };
}
