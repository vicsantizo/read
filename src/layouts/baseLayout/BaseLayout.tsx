import { Outlet } from 'react-router-dom';
import { Accordion } from '../../components/ui/accordion';
import { Toggle } from '../../components/ui/toggle';
import { useTheme } from '../../context/theme/useTheme';
import { Header } from '../header';
import { Sidebar, useSidebar } from '../sidebar';

export const BaseLayout = () => {
  const { isSidebarShowing, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Header isSidebarShowing={isSidebarShowing} setIsSidebarShowing={toggleSidebar} />

      <Sidebar isSidebarShowing={isSidebarShowing}>
        <Accordion label="Settings">
          <Toggle label="Dark mode" toggleAction={setTheme} initialValue={theme === 'dark' ? true : false} />
        </Accordion>
      </Sidebar>

      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
