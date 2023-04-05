import { SearchIcon } from './SearchIcon';
import { useTheme } from '../../../../context/theme/useTheme';
import './searchBox.css';

type SearchBoxProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isDisabled?: boolean;
};

export const SearchBox = ({ searchValue, setSearchValue, isDisabled = false }: SearchBoxProps) => {
  const { theme } = useTheme();
  const inputTheme = theme == 'dark' ? 'input--dark' : 'input--light';

  return (
    <div className="library__filter">
      <div className="search">
        <SearchIcon />
        <input
          type="search"
          disabled={isDisabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`${!isDisabled ? 'Search book' : 'No books in your library to search...'}`}
          className={`input search__input ${inputTheme}`}
        />
      </div>
    </div>
  );
};

export default SearchBox;
