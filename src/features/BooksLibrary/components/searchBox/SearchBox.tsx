import { SearchIcon } from './SearchIcon';
import './searchBox.css';

type SearchBoxProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  disabled?: boolean;
};

export const SearchBox = ({ searchValue, setSearchValue, disabled }: SearchBoxProps) => {
  return (
    <div className="library__filter">
      <div className="search">
        <SearchIcon />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search book..."
          className="input search__input"
          disabled={disabled || false}
        />
      </div>
    </div>
  );
};

export default SearchBox;
