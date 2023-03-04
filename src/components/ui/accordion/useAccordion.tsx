import { useState } from 'react';

export const useAccordion = () => {
  const [isContentShowing, setIsContentShowing] = useState<boolean>(false);

  const handleClick = () => {
    setIsContentShowing(!isContentShowing);
  };

  return {
    isContentShowing: isContentShowing,
    setIsContentShowing: handleClick,
  };
};

export default useAccordion;
