import { Route, Routes, Outlet } from 'react-router-dom';
import { Dropdown } from './dropdown';
import { Header } from './header';
import { PersistentStorageProvider } from './library/dataStores/persistentStorageContext';
import Home from './pages/Home';
import Create from './pages/Create';
import NotFound from './pages/NotFound';
import { Sidebar, useSidebar } from './sidebar';
import { Toggle } from './toggle';
import { LocalStoragePersistentStorage } from './library/dataStores/localStoragePersistentStorage';

const AppLayout = () => {
  const { isSidebarActive, setIsSidebarActive } = useSidebar();
  return (
    <>
      <Header isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      <Sidebar isSidebarActive={isSidebarActive}>
        <Dropdown text="Settings">
          <Toggle text="Dark mode" />
        </Dropdown>
      </Sidebar>
      <Outlet />
    </>
  );
};

function App() {
  const localStoragePersistentStorage = new LocalStoragePersistentStorage();
  return (
    <>
      <Routes>
        <Route
          element={
            <PersistentStorageProvider value={localStoragePersistentStorage}>
              <AppLayout />
            </PersistentStorageProvider>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<Create />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
