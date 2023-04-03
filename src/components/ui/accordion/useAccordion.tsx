import { useState } from 'react';

export const useAccordion = (isOpen: boolean) => {
  const [isContentShowing, setIsContentShowing] = useState<boolean>(isOpen);

  const handleClick = () => {
    setIsContentShowing(!isContentShowing);
  };

  return {
    isContentShowing: isContentShowing,
    setIsContentShowing: handleClick,
  };
};

export default useAccordion;
