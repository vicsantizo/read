import { useEffect } from 'react';

export const useClickedOut = (elementRef: React.MutableRefObject<HTMLDivElement | null>, action?: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!elementRef.current?.contains(target)) {
        // allows closing component with the same button it was opened with
        if (action !== undefined) setTimeout(action);
      }
    };
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [elementRef]);
};

export default useClickedOut;
