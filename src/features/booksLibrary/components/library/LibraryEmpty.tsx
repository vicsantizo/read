import { Link } from 'react-router-dom';
import { useTheme } from '../../../../context/theme/useTheme';

export const LibraryEmpty = () => {
  const { theme } = useTheme();
  const libraryEmptyTheme = theme === 'dark' ? 'library-empty--dark' : 'library-empty--light';

  return (
    <div className={`library-empty ${libraryEmptyTheme}`}>
      <div className="library-empty__icon-wrapper">
        <svg className="library-empty__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width={110}>
          <path d="M3.425 13.953h24.173c.583-.255.557-.802.011-1.165-.547-.365-12.119-8.718-12.119-8.718S4.008 12.423 3.425 12.788c-.582.363-.619.91 0 1.165zM15.49 8.195c.965 0 1.748.782 1.748 1.747s-.783 1.748-1.748 1.748-1.747-.783-1.747-1.748.782-1.747 1.747-1.747zM4.027 26.932h22.968v-.977H4.027v.977zM9 24.936v-8.903h.978V14.93H4.985v1.003h.978v9.002H9zm8.03 0V15.97h.978v-.978h-4.992v.94h.977v9.002h3.037zm-14 3.994h24.963v-.914H3.03v.914zm21.968-3.994V15.97h.978v-.978h-4.993v.94h.979v9.002h3.036z" />
        </svg>
      </div>

      <p className="library-empty__msg">Add a new book to start tracking your progress</p>

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
