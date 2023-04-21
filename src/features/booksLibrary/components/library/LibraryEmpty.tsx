import { Link } from 'react-router-dom';
import { GreekLibraryIcon } from '../../../../components/ui/greekLibraryIcon';
import { useTheme } from '../../../../context/theme/useTheme';

export const LibraryEmpty = () => {
  const { theme } = useTheme();
  const libraryEmptyTheme = theme === 'dark' ? 'library-empty--dark' : 'library-empty--light';
  const libraryEmptyMessageTheme = theme === 'dark' ? 'library-empty__msg--dark' : 'library-empty__msg--light';

  return (
    <div className={`library-empty ${libraryEmptyTheme}`}>
      <div className="library-empty__icon-wrapper">
        <GreekLibraryIcon className="library-empty__icon" width={110} />
      </div>

      <p className={`library-empty__msg ${libraryEmptyMessageTheme}`}>Add a new book to start tracking your progress</p>

      <Link to={'/books/new'} className="library-empty__link">
        <svg className="library-empty__link-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={23}>
          <path d="m426.666667 320-.001 63.999333 64.001.000667v42.666666l-64.001-.000333.001 64.000333H384l-.000333-64.000333L320 426.666666V384l63.999667-.000667L384 320h42.666667Zm-128 64v42.666666h-256V384h256ZM320 106.6666663V362.666666h-64V106.6666663h64ZM149.333334 85.333333v277.333333H85.3333337V85.333333h64.0000003Zm85.333333 21.3333333V362.666666h-64V106.6666663h64Zm159.027696.5842636L430.188667 298.66593h-68.286l-31.236-180.3015167 63.027696-11.1134834Z" />
        </svg>
        <span>Add book</span>
      </Link>
    </div>
  );
};

export default LibraryEmpty;
