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
    <div className="relative">
      <button tabIndex={-1} className="absolute top-[50%] left-[10px] translate-y-[-50%]">
        <SearchIcon />
      </button>
      <input
        type="search"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search book..."
        className={`rounded-3xl ${
          theme === 'dark' ? 'bg-[#1f1f23]' : 'bg-white'
        } w-[35ch] min-w-[25ch] border border-gray-500 py-2 pl-10 pr-3 outline-none focus:border-[#3d65af] xl:w-[45ch] 2xl:w-[55ch]`}
      />
    </div>
  );
};

export default SearchInput;
