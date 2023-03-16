import { Outlet } from 'react-router-dom';
import { Accordion } from '../../components/ui/accordion';
import { Toggle } from '../../components/ui/toggle';
import { Header } from '../header';
import { Sidebar, useSidebar } from '../sidebar';

export const BaseLayout = () => {
  const { isSidebarShowing, toggleSidebar } = useSidebar();
  return (
    <>
      <Header isSidebarShowing={isSidebarShowing} setIsSidebarShowing={toggleSidebar} />

      <Sidebar isSidebarShowing={isSidebarShowing}>
        <Accordion label="Settings">
          <Toggle label="Dark mode" />
        </Accordion>
      </Sidebar>

      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
