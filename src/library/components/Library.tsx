import { Book } from './Book';
import EditButton from './EditButton';
import MenuButton from './MenuButton';
import AddButton from './AddButton';
import Search from './Search';
import { useState, useEffect, useRef } from 'react';
import { Book as BookType } from '../models';

type LibraryProps = {
  books: BookType[];
};

export const Library = ({ books }: LibraryProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);
  const searchElement = useRef<HTMLInputElement | null>(null);

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
      <div className="library__filter flex justify-center align-center mt-10 mb-12">
        <Search setSearchValue={setSearchValue} searchValue={searchValue} ref={searchElement} />
      </div>
      <h1 className="library__title font-bold text-[1.5rem] md:text-[1.25rem] text-center mb-4 mt-5">My Library</h1>
      <div className="library__actions flex gap-5 justify-center mb-4 items-center">
        <MenuButton />
        <EditButton />
        <AddButton />
      </div>
      <div className="library__body">
        <div className="library__books flex gap-3 flex-wrap justify-center ">
          {filteredBooks.map((book) => (
            <Book key={book.getIdentifier()} title={book.getTitle()} author={book.getAuthor()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
