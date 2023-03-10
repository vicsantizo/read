import { useEffect } from 'react';

export function useDetectClickOut(htmlElementId: string, action?: () => void) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleClickOutside = (e: MouseEvent) => {
      const element = document.querySelector(`#${htmlElementId}`);
      const target = e.target as Node;

      if (!element?.contains(target)) {
        if (action !== undefined) action();
      }
    };

    document.addEventListener('click', handleClickOutside, { signal: signal });

    return () => {
      controller.abort();
    };
  }, [htmlElementId]);
}

export default useDetectClickOut;
