import { useEffect, useState } from 'react';
import { useBooksLibraryStore } from '../../../store/useBooksLibraryStore';
import { FormState } from './useSaveBook';

const initialForm = {
  id: '',
  title: '',
  author: '',
  category: '',
  description: '',
  pages: '',
  isFavorite: false,
};

export const useInitialFormState = (bookId: string) => {
  const [initialFormState, setInitialFormState] = useState<FormState>(initialForm);
  const { getBookById } = useBooksLibraryStore();

  useEffect(() => {
    getBookById(bookId).then((retrievedBook) => {
      setInitialFormState({
        id: retrievedBook?.getIdentifier() || '',
        title: retrievedBook?.getTitle() || '',
        author: retrievedBook?.getAuthor() || '',
        category: retrievedBook?.getCategory() || '',
        description: retrievedBook?.getDescription() || '',
        pages: retrievedBook?.getPages() || '',
        isFavorite: retrievedBook?.getIsFavorite() || false,
      });
    });
  }, []);

  return {
    initialFormState,
  };
};

export default useInitialFormState;
