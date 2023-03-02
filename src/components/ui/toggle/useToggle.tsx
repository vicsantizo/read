import { useState } from 'react';

export const useToggle = (initialStatus: boolean, toggleAction?: () => void) => {
  const [toggleStatus, setToggleStatus] = useState<boolean>(initialStatus);

  const handleClick = () => {
    // Only call toggleAction when toggle goes from off -> on
    if (toggleAction && !toggleStatus) toggleAction();
    setToggleStatus(!toggleStatus);
  };

  return {
    toggleStatus,
    handleClick,
  };
};
