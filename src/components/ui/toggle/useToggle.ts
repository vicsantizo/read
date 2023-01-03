import { useState } from 'react';

export const useToggle = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return {
    isActive,
    toggle,
  };
};

export default useToggle;
