import { Route, Routes, Outlet } from 'react-router-dom';
import { Dropdown } from './dropdown';
import { Header } from './header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Sidebar, useSidebar } from './sidebar';
import { Toggle } from './toggle';

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
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
