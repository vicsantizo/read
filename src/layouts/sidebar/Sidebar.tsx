import { ReactNode } from 'react';
import './sidebar.css';

type SidebarProps = {
  isSidebarShowing: boolean;
  children: ReactNode;
};

export const Sidebar = (props: SidebarProps) => {
  const { isSidebarShowing, children } = props;
  const sidebarClassName = isSidebarShowing ? 'sidebar' : 'sidebar--hide';

  return (
    <nav className={sidebarClassName}>
      <div className="sidebar__content">{children}</div>
    </nav>
  );
};

export default Sidebar;
