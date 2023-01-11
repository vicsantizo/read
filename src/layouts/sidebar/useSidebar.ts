import { useState } from 'react';

export const useSidebar = (): { isSidebarActive: boolean; setIsSidebarActive: () => void } => {
  const [isSidebarActive, setIsSidebarActive] = useState<boolean>(false);

  function handleisSidebarActive() {
    setIsSidebarActive(!isSidebarActive);
  }

  return {
    isSidebarActive,
    setIsSidebarActive: handleisSidebarActive,
  };
};

export default useSidebar;
