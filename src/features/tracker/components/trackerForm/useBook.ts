import { useEffect, useState } from 'react';
import { useBooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { Book } from '../../../booksLibrary/models';

export const useBook = (bookId: string) => {
  const [bookData, setBookData] = useState<Book | undefined>(undefined);
  const { getBookById } = useBooksLibraryStore();

  useEffect(() => {
    getBookById(bookId).then((retrievedBook) => {
      if (retrievedBook === undefined) {
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
