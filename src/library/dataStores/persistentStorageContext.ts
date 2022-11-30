import { useContext, createContext } from 'react';
import { IBookPersistentStorage } from './IBookPersistentStorage';

const PersistentStorageContext = createContext<IBookPersistentStorage | undefined>(undefined);

export const PersistentStorageProvider = PersistentStorageContext.Provider;

export const usePersistentStorage = () => {
  const persistentStorage = useContext(PersistentStorageContext);

  if (!persistentStorage) {
    throw new Error('usePersistentStorage must be used inside of a PersistentStorageContext');
  }

  return persistentStorage;
};
