import { useState } from 'react';

export const useSidebar = () => {
  const [isSidebarShowing, setIsSidebarShowing] = useState<boolean>(false);

  function toggleSidebar() {
    setIsSidebarShowing(!isSidebarShowing);
  }

  return {
    isSidebarShowing,
    setIsSidebarShowing,
    toggleSidebar,
  };
};

export default useSidebar;
