import { useState, useMemo } from 'react';
import { Book } from '../book';
import { SearchInput } from '../../../../components/ui/searchInput';
import { BooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { useTheme } from '../../../../context/theme/useTheme';
import { TrackButton, AddButton, EditButton, DeleteButton } from '../buttons';
import { useBookSelection } from './useBookSelection';
import { filterLibraryBooks } from '../../utils/utils';
import { Book as BookType } from '../../models';
import { EmptyLibrary } from '../emptyLibrary';

export const Library = ({ books, deleteBookById }: BooksLibraryStore) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { theme } = useTheme();
  const {
    booksSelection,
    setBooksSelection,
    countElementsSelected,
    getSelectedBook,
    getArrayOfCurrentlySelectedBooks,
    resetBooksSelection,
  } = useBookSelection();
  const filteredBooks: BookType[] = useMemo(
    () => books.filter((book) => filterLibraryBooks(searchValue, book)),
    [searchValue, books],
  );

  return (
    <div className={`library ${theme}`}>
      {books.length === 0 ? (
        <EmptyLibrary />
      ) : (
        <>
          <div className="library__filter mb-12 flex items-center justify-center pt-[4rem]">
            <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>

          <div className="relative mb-2 mt-5 flex items-center">
            <h1 className="text-center text-[1.25rem] font-bold sm:mx-auto">My Library</h1>
            <span className="absolute right-0 flex h-full items-center gap-2">
              <AddButton to="books/create" />
              <span className="h-full border border-l-0 border-gray-500"></span>
              <TrackButton to={`books/${getSelectedBook()}/track`} disabled={!(countElementsSelected() === 1)} />
              <EditButton to={`books/${getSelectedBook()}/edit`} disabled={!(countElementsSelected() === 1)} />
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
              } flex flex-wrap justify-center gap-3 py-[1rem] `}
            >
              {filteredBooks.map((book) => (
                <Book
                  booksSelection={booksSelection}
                  setBooksSelection={setBooksSelection}
                  resetBooksSelection={resetBooksSelection}
                  deleteBookById={deleteBookById}
                  key={book.getIdentifier()}
                  id={book.getIdentifier()}
                  title={book.getTitle()}
                  author={book.getAuthor()}
                  enableActions={true}
                  progress={book?.getTracker().calculateCompletion(book.getPages())}
                />
              ))}
              {/* {books.length === 0 && <EmptyLibrary />} */}
              {books.length > 0 && filteredBooks.length === 0 && 'No results...'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
