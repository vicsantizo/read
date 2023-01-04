import { Outlet } from 'react-router-dom';
import { Dropdown } from '../../components/ui/dropdown/Dropdown';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { Toggle } from '../../components/ui/toggle';
import { useSidebar } from '../sidebar/useSidebar';

export const BaseLayout = () => {
  const { isSidebarActive, setIsSidebarActive } = useSidebar();
  return (
    <>
      <Header isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      <Sidebar isSidebarActive={isSidebarActive}>
        <Dropdown text="Settings">
          <Toggle text="Dark mode" />
        </Dropdown>
      </Sidebar>
      <div className="p-[var(--page-padding)] h-[100vh] dark">
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
