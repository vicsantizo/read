import { createContext } from 'react';
import { IBookLibraryPersistentStorage } from '../../store/IBooksLibraryPersistentStorage';

export const PersistentStorageContext = createContext<IBookLibraryPersistentStorage | undefined>(undefined);

export const PersistentStorageProvider = PersistentStorageContext.Provider;
