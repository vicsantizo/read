import { Book } from './Book';
import EditButton from './EditButton';
import MenuButton from './MenuButton';
import AddButton from './AddButton';
import { DeleteButton } from './DeleteButton';
import Search from './Search';
import { useState, useEffect, useRef } from 'react';
import { Book as BookType } from '../models';
import { BooksStore } from '../dataStores/useBookStore';
import { Book2 } from './Book2';

export const Library = ({ data: books, error, createBook, removeBook }: BooksStore) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const searchElement = useRef<HTMLInputElement | null>(null);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [defaultView, setDefaultView] = useState<boolean>(true);

  // Stores books that are checkbox selected, used to not trigger re-renders
  const booksSelected = useRef<Record<string, boolean>>({});

  function handleEditionMode() {
    setEditionMode((p) => !p);
  }

  function handleView() {
    setDefaultView((p) => !p);
  }

  useEffect(() => {
    // filter books depending value from search input
    if (searchValue) {
      setFilteredBooks(books);
    }
    setFilteredBooks(
      books.filter((book) => {
        return (
          book.getTitle().toLowerCase().includes(searchValue.toLowerCase()) ||
          book.getAuthor().toLowerCase().includes(searchValue.toLowerCase())
        );
      }),
    );
  }, [searchValue, books]);

  return (
    <div className="library">
      <div className="library__filter flex justify-center items-center mt-10 mb-12">
        <Search setSearchValue={setSearchValue} searchValue={searchValue} ref={searchElement} />
      </div>
      <div className="relative flex mb-2 items-center mt-5">
        <h1 className="font-bold text-[1.25rem] text-center sm:mx-auto">My Library</h1>
        <span className="flex items-center absolute gap-2 right-0">
          <MenuButton handleView={handleView} />
          <EditButton setEditionMode={handleEditionMode} defaultView={defaultView} />
          <AddButton />
          <DeleteButton
            defaultView={defaultView}
            editionMode={editionMode}
            removeBook={removeBook}
            booksSelected={booksSelected}
          />
        </span>
      </div>
      <div className="library__body">
        <div className="border border-[#242526] library__books py-[1rem] flex gap-3 flex-wrap justify-center ">
          {defaultView &&
            filteredBooks.map((book) => (
              <Book
                key={book.getIdentifier()}
                bookId={book.getIdentifier()}
                title={book.getTitle()}
                author={book.getAuthor()}
                booksSelected={booksSelected}
                editionMode={editionMode}
              />
            ))}
          {!defaultView &&
            filteredBooks.map((book) => (
              <Book2
                key={book.getIdentifier()}
                bookId={book.getIdentifier()}
                title={book.getTitle()}
                author={book.getAuthor()}
                description={book.getDescription()}
                category={book.getCategory()}
                pages={book.getPages()}
                isFavorite={book.getIsFavorite()}
                isFinished={book.getIsFinished()}
                booksSelected={booksSelected}
                editionMode={editionMode}
                removeBook={removeBook}
              />
            ))}
          {filteredBooks.length === 0 && 'Empty...'}
        </div>
      </div>
    </div>
  );
};

export default Library;
