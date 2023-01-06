import { useState } from 'react';
import { Book } from '../book';
import { SearchInput } from '../../../../components/ui/searchInput';
import { BooksLibraryStore } from '../../../../store/useBooksLibraryStore';
import { useLibraryFilter } from './useLibraryFilter';
import { useTheme } from '../../../../context/theme/useTheme';
import { TrackButton, AddButton, EditButton, DeleteButton } from '../buttons';

export const Library = ({ books }: BooksLibraryStore) => {
  const [searchValue, setSeachValue] = useState<string>('');
  const { theme } = useTheme();
  const { filteredBooks } = useLibraryFilter(searchValue, books);

  return (
    <div className={`library ${theme}`}>
      <div className="library__filter flex justify-center items-center pt-[4rem] mb-12">
        <SearchInput searchValue={searchValue} setSearchValue={setSeachValue} />
      </div>

      <div className="relative flex mb-2 items-center mt-5">
        <h1 className="font-bold text-[1.25rem] text-center sm:mx-auto">My Library</h1>
        <span className="flex items-center absolute gap-2 right-0">
          <TrackButton />
          <AddButton />
          <EditButton />
          <DeleteButton />
        </span>
      </div>

      <div className="library__body">
        <div className="border border-[#242526] py-[1rem] flex gap-3 flex-wrap justify-center ">
          {filteredBooks.map((book) => (
            <Book key={book.getIdentifier()} title={book.getTitle()} author={book.getAuthor()} progress={100} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
