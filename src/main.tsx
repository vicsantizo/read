import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocalStoragePersistentStorage } from './store/localStoragePersistentStorage';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const localStoragePersistentStorage = new LocalStoragePersistentStorage();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App persistentStorage={localStoragePersistentStorage} />
  </React.StrictMode>,
);
