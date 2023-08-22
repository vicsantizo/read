import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../../../../context/books/useBooksContext';
import { PersistentStorageContext } from '../../../../context/persistentStorage/PersistentStorageContext';
import { useTheme } from '../../../../context/theme/useTheme';
import { useOffInteractionHandle } from '../../../../hooks/useOffInteractionHandle';
import { IBooksLibraryPersistentStorage } from '../../../../store/IBooksLibraryPersistentStorage';
import { EditIcon, InfoIcon, TrackIcon, DeleteIcon } from '../icons';

type PopoverOptionsProps = {
  bookId: string;
  handleClickout: () => void;
};

export const PopoverOptions = ({ bookId, handleClickout }: PopoverOptionsProps) => {
  const persistentStorage = useContext(PersistentStorageContext);
  const { deleteBook } = useBooksContext(persistentStorage as IBooksLibraryPersistentStorage);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOffInteractionHandle(popoverRef, handleClickout);

  const { theme } = useTheme();
  const popoverTheme = theme == 'dark' ? 'book__popover--dark' : 'book__popover--light';
  const popoverSeparatorTheme = theme == 'dark' ? 'book__popover-separator--dark' : 'book__popover-separator--light';
  const popoverLinkIconTheme = theme == 'dark' ? 'book__popover-link-icon--dark' : 'book__popover-link-icon--light';
  const popoverBtnIconTheme = theme == 'dark' ? 'book__popover-button-icon--dark' : 'book__popover-button-icon--light';

  return (
    <div ref={popoverRef} className={`book__popover ${popoverTheme}`}>
      <ul className="book__popover-list">
        <li className="book__popover-item book__popover-item--border">
          <Link to={`/books/${bookId}`} className="book__popover-link">
            See more
            <div className="book__popover-link-icon-box">
              <InfoIcon className={`book__popover-link-icon ${popoverLinkIconTheme}`} />
            </div>
          </Link>
        </li>

        <li className="book__popover-item">
          <Link to={`/books/edit/${bookId}`} className="book__popover-link">
            Edit book
            <div className="book__popover-link-icon-box">
              <EditIcon className={`book__popover-link-icon ${popoverLinkIconTheme}`} />
            </div>
          </Link>
        </li>

        <li className={`book__popover-separator ${popoverSeparatorTheme}`}></li>

        <li className="book__popover-item book__popover-item--border">
          <Link to={`/books/${bookId}`} className="book__popover-link" state={{ isOpen: true }}>
            Track progress
            <div className="book__popover-link-icon-box">
              <TrackIcon className={`book__popover-link-icon ${popoverLinkIconTheme}`} />
            </div>
          </Link>
        </li>

        <li className="book__popover-item">
          <button className="book__popover-button" onClick={() => deleteBook(bookId)}>
            Delete book
            <div className="book__popover-button-icon-box">
              <DeleteIcon className={`book__popover-button-icon ${popoverBtnIconTheme}`} />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PopoverOptions;
