import { LocalStoragePersistentStorage } from '../library/dataStores/localStoragePersistentStorage';
import { PersistentStorageProvider } from '../library/dataStores/persistentStorageContext';
import { Library } from '../library';

import './css/home.css';

const Home = () => {
  const localStoragePersistentStorage = new LocalStoragePersistentStorage();

  return (
    <PersistentStorageProvider value={localStoragePersistentStorage}>
      <div className="home">
        <Library />
      </div>
    </PersistentStorageProvider>
  );
};

export default Home;
