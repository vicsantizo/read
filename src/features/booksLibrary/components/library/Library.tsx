import { LibraryHeading } from './LibraryHeading';
import { LibraryContent } from './LibraryContent';
import { LibraryEmpty } from './LibraryEmpty';
import { SearchBox } from '../searchBox';
import { useContext, useState } from 'react';
import { BooksContext } from '../../../../context/books/BooksContext';
import './library.css';

export const Library = () => {
  const { books } = useContext(BooksContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const isLibraryEmpty = books.length === 0;

  if (isLibraryEmpty) {
    return (
      <div className="library">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} isDisabled={true} />
        <LibraryHeading />
        <LibraryEmpty />
      </div>
    );
  }

  return (
    <div className="library">
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      <LibraryHeading />
      <LibraryContent searchValue={searchValue} />
    </div>
  );
};

export default Library;
