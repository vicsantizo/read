import { useContext } from 'react';
import { PersistentStorageContext } from './PersistentStorageContext';

export const usePersistentStorage = () => {
  const persistentStorage = useContext(PersistentStorageContext);

  if (!persistentStorage) {
    throw new Error('usePersistentStorage must be used inside of a PersistentStorageContext');
  }

  return persistentStorage;
};
