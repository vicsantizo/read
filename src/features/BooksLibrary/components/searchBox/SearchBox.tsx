import { SearchIcon } from './SearchIcon';
import './searchBox.css';

type SearchBoxProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchBox = ({ searchValue, setSearchValue }: SearchBoxProps) => {
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
        />
      </div>
    </div>
  );
};

export default SearchBox;
