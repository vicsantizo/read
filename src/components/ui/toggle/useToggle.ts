import { useState } from 'react';

export const useToggle = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return {
    isActive,
    toggle,
  };
};

export default useToggle;
