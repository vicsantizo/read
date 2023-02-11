import { useState } from 'react';

export const useSidebar = () => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  function handleisSidebarActive() {
    setIsSidebarActive(!isSidebarActive);
  }

  return {
    isSidebarActive,
    setIsSidebarActive: handleisSidebarActive,
    setSidebarState: setIsSidebarActive,
  };
};

export default useSidebar;
