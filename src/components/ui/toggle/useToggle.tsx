import { useState } from 'react';

export const useToggle = (initialStatus: boolean, toggleAction?: () => void) => {
  const [toggleStatus, setToggleStatus] = useState<boolean>(initialStatus);

  const handleClick = () => {
    if (toggleAction) toggleAction();
    setToggleStatus(!toggleStatus);
  };

  return {
    toggleStatus,
    handleClick,
  };
};
