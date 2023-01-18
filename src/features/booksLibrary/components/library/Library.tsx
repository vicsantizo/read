import { useState } from 'react';
import { Book } from '../book';
import { SearchInput } from '../../../../components/ui/searchInput';
import { BooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { useLibraryFilter } from './useLibraryFilter';
import { useTheme } from '../../../../context/theme/useTheme';
import { TrackButton, AddButton, EditButton, DeleteButton } from '../buttons';
import { Link } from 'react-router-dom';
import { useBookSelection } from './useBookSelection';

export const Library = ({ books, deleteBookById }: BooksLibraryStore) => {
  const [searchValue, setSeachValue] = useState<string>('');
  const { theme } = useTheme();
  const { filteredBooks } = useLibraryFilter(searchValue, books);
  const {
    booksSelection,
    setBooksSelection,
    countElementsSelected,
    getSelectedBook,
    getArrayOfCurrentlySelectedBooks,
    resetBooksSelection,
  } = useBookSelection();

  return (
    <div className={`library ${theme}`}>
      <div className="library__filter flex justify-center items-center pt-[4rem] mb-12">
        <SearchInput searchValue={searchValue} setSearchValue={setSeachValue} />
      </div>

      <div className="relative flex mb-2 items-center mt-5">
        <h1 className="font-bold text-[1.25rem] text-center sm:mx-auto">My Library</h1>
        <span className="flex items-center absolute gap-2 right-0">
          <Link className="flex items-center" to={`books/${getSelectedBook()}/track`} tabIndex={-1}>
            <TrackButton disabled={!(countElementsSelected() === 1)} />
          </Link>
          <Link className="flex items-center" to="books/create" tabIndex={-1}>
            <AddButton />
          </Link>
          <Link className="flex items-center" to={`books/${getSelectedBook()}/edit`} tabIndex={-1}>
            <EditButton disabled={!(countElementsSelected() === 1)} />
          </Link>
          <DeleteButton
            disabled={!(countElementsSelected() >= 1)}
            execute={() => {
              deleteBookById(getArrayOfCurrentlySelectedBooks());
              resetBooksSelection();
            }}
          />
        </span>
      </div>

      <div className="library__body">
        <div
          className={`border ${
            theme == 'dark' ? 'border-[#242526]' : 'border-[#f3f3f3]'
          } py-[1rem] flex gap-3 flex-wrap justify-center `}
        >
          {filteredBooks.map((book) => (
            <Book
              booksSelection={booksSelection}
              setBooksSelection={setBooksSelection}
              key={book.getIdentifier()}
              id={book.getIdentifier()}
              title={book.getTitle()}
              author={book.getAuthor()}
              progress={book?.getTracker().calculateCompletion(book.getPages())}
            />
          ))}
          {filteredBooks.length === 0 && 'Empty...'}
        </div>
      </div>
    </div>
  );
};

export default Library;
