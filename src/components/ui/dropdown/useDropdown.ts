import { useState } from 'react';

export const useDropdown = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  function toggleContent() {
    setIsActive(!isActive);
  }

  return {
    isActive,
    toggleContent,
  };
};

export default useDropdown;
