import { ReactNode, useRef } from 'react';
import { useDetectClickOut } from '../../features/booksLibrary/components/bookActionsPopover/useDetectClickOut';
import './sidebar.css';

type SidebarProps = {
  isSidebarActive: boolean;
  children: ReactNode;
  handleClickOut: () => void;
};

export function Sidebar(props: SidebarProps) {
  const sidebarClassName = props.isSidebarActive ? 'sidebar' : 'sidebar--hide';
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  useDetectClickOut(sidebarRef, props.handleClickOut);
  return (
    <div ref={sidebarRef} role="navigation" className={sidebarClassName}>
      {props.isSidebarActive && props.children}
    </div>
  );
}

export default Sidebar;
