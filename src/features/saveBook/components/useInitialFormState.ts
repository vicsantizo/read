import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigation = useNavigate();

  useEffect(() => {
    getBookById(bookId).then((retrievedBook) => {
      if (retrievedBook === undefined) {
        navigation('/error');
        throw Error(`The book with the ${bookId} does not exist`);
      }
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
