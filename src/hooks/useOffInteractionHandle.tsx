import { RefObject, useEffect } from 'react';

export function useOffInteractionHandle(htmlElement: RefObject<HTMLDivElement>, action: () => void) {
  const handleClickoutDetection = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!htmlElement.current?.contains(target)) setTimeout(action);
  };

  const handleEscapeKeyDetection = (e: KeyboardEvent) => {
    const keyDetected = e.key;
    if (keyDetected == 'Escape') setTimeout(action);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickoutDetection, true);
    document.addEventListener('keydown', handleEscapeKeyDetection, true);
    return () => {
      document.removeEventListener('click', handleClickoutDetection, true);
      document.removeEventListener('keydown', handleEscapeKeyDetection, true);
    };
  }, []);
}

export default useOffInteractionHandle;
