import { Outlet } from 'react-router-dom';
import { Dropdown } from '../../components/ui/dropdown/Dropdown';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { Toggle } from '../../components/ui/toggle';
import { useSidebar } from '../sidebar/useSidebar';
import { useTheme } from '../../context/theme/useTheme';

export const BaseLayout = () => {
  const { isSidebarActive, setIsSidebarActive } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Header isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      <Sidebar isSidebarActive={isSidebarActive}>
        <Dropdown text="Settings">
          <Toggle text="Dark mode" execute={setTheme} state={theme === 'dark' ? true : false} />
        </Dropdown>
      </Sidebar>
      <div className={`p-[var(--page-padding)] ${theme}`}>
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
