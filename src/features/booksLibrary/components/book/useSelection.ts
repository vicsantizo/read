import { useEffect, useRef } from 'react';
import { useTheme } from '../../../../context/theme/useTheme';

export const useSelectionMark = (booksSelection: Map<string, boolean>, bookId: string) => {
  const bookButtonRef = useRef<HTMLButtonElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (booksSelection.get(bookId)) bookButtonRef.current?.classList.add('border');
  }, [theme]);

  return {
    bookButtonRef,
  };
};

export default useSelectionMark;
