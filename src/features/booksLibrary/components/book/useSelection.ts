import { useEffect, useRef } from 'react';
import { useTheme } from '../../../../context/theme/useTheme';

export const useSelectionMark = (booksSelection: Map<string, boolean>, bookId: string) => {
  const bookButtonRef = useRef<HTMLButtonElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (booksSelection.get(bookId)) bookButtonRef.current?.classList.add('border');

    return () => {
      bookButtonRef.current?.classList.remove('border');
    };
  }, [theme, booksSelection]);

  return {
    bookButtonRef,
  };
};

export default useSelectionMark;
