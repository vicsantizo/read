import { useEffect, useState } from 'react';

export const useToggle = (defaultState?: boolean) => {
  useEffect(() => {
    if (defaultState) setIsActive(defaultState);
    else setIsActive(false);
  }, []);

  const [isActive, setIsActive] = useState<boolean>(true);

  return {
    isActive,
    setIsActive,
  };
};

export default useToggle;
