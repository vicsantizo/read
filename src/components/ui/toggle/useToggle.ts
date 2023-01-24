import { useState } from 'react';

export const useToggle = (defaultState = false) => {
  const [isActive, setIsActive] = useState<boolean>(defaultState);

  return {
    isActive,
    setIsActive,
  };
};

export default useToggle;
