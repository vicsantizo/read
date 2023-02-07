import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { Book } from '../../../booksLibrary/models';

export const useBook = (bookId: string) => {
  const [bookData, setBookData] = useState<Book | undefined>(undefined);
  const { getBookById } = useBooksLibraryStore();
  const navigation = useNavigate();

  useEffect(() => {
    getBookById(bookId).then((retrievedBook) => {
      if (retrievedBook === undefined) {
        navigation('/error'); // temp fix
        throw Error(`The book with the ${bookId} does not exist`);
      }
      setBookData(retrievedBook);
    });
  }, []);

  return {
    bookData,
  };
};

export default useBook;
