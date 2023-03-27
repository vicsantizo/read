import { RefObject, useEffect } from 'react';

export function useDetectClickOut(htmlElement: RefObject<HTMLDivElement>, action: () => void) {
  const handleClickoutDetection = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!htmlElement.current?.contains(target)) {
      setTimeout(action);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickoutDetection, true);

    return () => {
      document.removeEventListener('click', handleClickoutDetection, true);
    };
  }, []);
}

export default useDetectClickOut;
