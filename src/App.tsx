import { Route, Routes, Outlet } from 'react-router-dom';
import { Dropdown } from './dropdown';
import { Header } from './header';
import { PersistentStorageProvider } from './library/dataStores/persistentStorageContext';
import NotFound from './pages/NotFound';
import { Sidebar, useSidebar } from './sidebar';
import { Toggle } from './toggle';
import { LocalStoragePersistentStorage } from './library/dataStores/localStoragePersistentStorage';
import { lazy, Suspense } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Create = lazy(() => import('./pages/Create'));
const Home = lazy(() => import('./pages/Home'));

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
      <Suspense
        fallback={
          <div className="w-[100%] h-[100vh] flex justify-center items-center">
            <ClipLoader color="#3d65af" size={28} />
          </div>
        }
      >
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
      </Suspense>
    </>
  );
}

export default App;
