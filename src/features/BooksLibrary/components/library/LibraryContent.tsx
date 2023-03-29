import { useContext } from 'react';
import { BooksContext } from '../../../../context/books/BooksContext';
import { useTheme } from '../../../../context/theme/useTheme';
import { filterLibraryBooks } from '../../utils/filter';
import { Book } from '../book';
import { LibraryNoResults } from './LibraryNoResults';

type LibraryContentProps = {
  searchValue: string;
};

export const LibraryContent = ({ searchValue }: LibraryContentProps) => {
  const { books } = useContext(BooksContext);
  const filteredBooks = books.filter((book) => filterLibraryBooks(searchValue, book));
  const filterHasNoResults = books.length > 0 && filteredBooks.length === 0;
  const { theme } = useTheme();
  const libraryBodyTheme = theme === 'dark' ? 'library__body--dark' : 'library__body--light';

  if (filterHasNoResults) return <LibraryNoResults />;

  return (
    <div className={`library__body ${libraryBodyTheme}`}>
      {filteredBooks.map((book) => (
        <Book key={Math.random()} book={book} />
      ))}
    </div>
  );
};

export default LibraryContent;
