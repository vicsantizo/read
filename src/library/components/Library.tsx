import { useBooksStore } from '../dataStores/useBookStore';
import { Book } from './Book';
import EditButton from './EditButton';
import MenuButton from './MenuButton';
import AddButton from './AddButton';
import Search from './Search';
import { useState, useEffect } from 'react';
import { Book as BookType } from '../models';

export const Library = () => {
  const { data, error, createBook } = useBooksStore();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]);

  // filter books depending value from search input
  useEffect(() => {
    if (searchValue) {
      setFilteredBooks(data);
    }
    setFilteredBooks(
      data.filter((book) => {
        return (
          book.getTitle().toLowerCase().includes(searchValue.toLowerCase()) ||
          book.getAuthor().toLowerCase().includes(searchValue.toLowerCase())
        );
      }),
    );
  }, [searchValue, data]);

  return (
    <div className="library">
      <h1 className="library__title font-bold text-[1.25rem] text-center mb-4 mt-5 ">My Library</h1>
      <div className="library__filter flex justify-center align-center mt-5 mb-5">
        <Search setSearchValue={setSearchValue} searchValue={searchValue} />
      </div>
      <div className="library__actions flex gap-3 justify-center mb-6 items-center">
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
