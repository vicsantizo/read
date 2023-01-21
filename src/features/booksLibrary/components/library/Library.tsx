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
        <span className="flex items-center absolute gap-2 right-0 h-full">
          <AddButton to="books/create" />
          <span className="border border-gray-500 border-l-0 h-full"></span>
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
