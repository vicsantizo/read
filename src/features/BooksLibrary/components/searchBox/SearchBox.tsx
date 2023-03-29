import { SearchIcon } from './SearchIcon';
import { useTheme } from '../../../../context/theme/useTheme';
import './searchBox.css';

type SearchBoxProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchBox = ({ searchValue, setSearchValue }: SearchBoxProps) => {
  const { theme } = useTheme();
  const inputTheme = theme == 'dark' ? 'input--dark' : 'input--light';

  return (
    <div className="library__filter">
      <div className="search">
        <SearchIcon />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search book..."
          className={`input search__input ${inputTheme}`}
        />
      </div>
    </div>
  );
};

export default SearchBox;
