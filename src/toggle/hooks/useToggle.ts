import { useState } from 'react';

export function useToggle() {
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleSetIsActive() {
    setIsActive(!isActive);
  }

  return {
    isActive,
    handleSetIsActive,
  };
}

export default useToggle;
