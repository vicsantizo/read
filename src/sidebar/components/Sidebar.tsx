import { ReactNode } from 'react';
import './css/sidebar.css';

type SidebarProps = {
  isSidebarActive: boolean;
  children: ReactNode;
};

export function Sidebar(props: SidebarProps) {
  const sidebarClassName = props.isSidebarActive ? 'sidebar' : 'sidebar--hide';
  return (
    <div role="navigation" className={sidebarClassName}>
      {props.isSidebarActive && props.children}
    </div>
  );
}

export default Sidebar;
