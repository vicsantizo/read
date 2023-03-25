import { useContext } from 'react';
import { BooksContext } from '../../../../context/books/BooksContext';
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

  if (filterHasNoResults) return <LibraryNoResults />;

  return (
    <div className="library__body">
      {filteredBooks.map((book) => (
        <Book key={Math.random()} book={book} />
      ))}
    </div>
  );
};

export default LibraryContent;
