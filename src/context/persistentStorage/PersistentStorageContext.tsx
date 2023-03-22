import { createContext } from 'react';
import { IBooksLibraryPersistentStorage } from '../../store/IBooksLibraryPersistentStorage';

export const PersistentStorageContext = createContext<IBooksLibraryPersistentStorage | undefined>(undefined);
