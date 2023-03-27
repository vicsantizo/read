import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../../../../context/books/useBooksContext';
import { PersistentStorageContext } from '../../../../context/persistentStorage/PersistentStorageContext';
import { useDetectClickOut } from '../../../../hooks/useDetectClickOut';
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
  useDetectClickOut(popoverRef, handleClickout);

  return (
    <div ref={popoverRef} className="book__popover book__popover--dark">
      <ul className="book__popover-list">
        <li className="book__popover-item book__popover-item--border">
          <Link to={`/books/${bookId}`} className="book__popover-link">
            See more
            <div className="book__popover-link-icon-box">
              <InfoIcon className="book__popover-link-icon book__popover-link-icon--dark" />
            </div>
          </Link>
        </li>

        <li className="book__popover-item">
          <Link to={`/books/edit/${bookId}`} className="book__popover-link">
            Edit book
            <div className="book__popover-link-icon-box">
              <EditIcon className="book__popover-link-icon book__popover-link-icon--dark" />
            </div>
          </Link>
        </li>

        <li className="book__popover-separator book__popover-separator--dark"></li>

        <li className="book__popover-item book__popover-item--border">
          <Link to={`/books/track/${bookId}`} className="book__popover-link">
            Track progress
            <div className="book__popover-link-icon-box">
              <TrackIcon className="book__popover-link-icon book__popover-link-icon--dark" />
            </div>
          </Link>
        </li>

        <li className="book__popover-item">
          <button className="book__popover-button" onClick={() => deleteBook(bookId)}>
            Delete book
            <div className="book__popover-button-icon-box">
              <DeleteIcon className="book__popover-button-icon book__popover-button-icon--dark" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PopoverOptions;
