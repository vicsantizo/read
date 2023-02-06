import { ChangeEvent } from 'react';
import { useTheme } from '../../../context/theme/useTheme';
import { SearchIcon } from './SearchIcon';

export type SearchProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchInput = ({ searchValue, setSearchValue }: SearchProps) => {
  const { theme } = useTheme();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="relative w-full min-w-[25ch] max-w-[40ch]">
      <button tabIndex={-1} className="absolute top-[50%] left-[10px] translate-y-[-50%]">
        <SearchIcon />
      </button>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search book..."
        className={`rounded-md border ${
          theme === 'dark'
            ? 'border-l-0 border-r-0 border-t-0 border-gray-800 bg-[#343434] [box-shadow:inset_0_4px_4px_hsl(0_0%_0%_/0.1)]'
            : 'border-gray-500 bg-white'
        } w-full  py-2 pl-10 pr-3`}
      />
    </div>
  );
};

export default SearchInput;
