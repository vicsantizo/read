import { Outlet } from 'react-router-dom';
import { Dropdown } from '../../components/ui/dropdown/Dropdown';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { Toggle } from '../../components/ui/toggle';
import { useSidebar } from '../sidebar/useSidebar';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { useTheme } from '../../context/theme/useTheme';

export const BaseLayout = () => {
  const { isSidebarActive, setIsSidebarActive } = useSidebar();
  const { currentTheme, changeTheme } = useTheme();

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Header isSidebarActive={isSidebarActive} setIsSidebarActive={setIsSidebarActive} />
      <Sidebar isSidebarActive={isSidebarActive}>
        <Dropdown text="Settings">
          <Toggle text="Dark mode" execute={changeTheme} state={currentTheme === 'dark' ? true : false} />
        </Dropdown>
      </Sidebar>
      <div className={`p-[var(--page-padding)] h-[100vh] ${currentTheme}`}>
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
};

export default BaseLayout;
