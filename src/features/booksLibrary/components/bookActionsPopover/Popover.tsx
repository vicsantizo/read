import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../context/theme/useTheme';
import { useDetectClickOut } from './useDetectClickOut';
import { BookInfoIcon, DeleteIcon, EditIcon, TrackIcon } from '../icons';

type PopoverProps = {
  bookId: string;
  handleClickOut: () => void;
  actions: {
    deleteBookById?: (id: string[]) => Promise<void>;
    resetBooksSelection?: () => void;
  };
};

export const Popover = ({ handleClickOut, bookId, actions: { deleteBookById, resetBooksSelection } }: PopoverProps) => {
  const actionsPopoverRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  useDetectClickOut(actionsPopoverRef, handleClickOut);
  const fillIconColor = theme == 'dark' ? 'fill-white' : 'fill-black';
  return (
    <div
      ref={actionsPopoverRef}
      className={`absolute ${
        theme == 'dark' ? 'bg-[#3B3B3B] text-white' : 'bg-[#FFFDFD] text-black'
      }  w-[175px] z-[9] rounded-md top-[13%] right-0 mr-1`}
    >
      <ul className="flex flex-col">
        <li className="py-2 px-3 border-b border-gray-500 hover:opacity-50">
          <Link className="flex justify-between items-center w-full" to={`/books/${bookId}`}>
            <div>See more</div>
            <div className="flex justify-end items-center">
              <BookInfoIcon className={fillIconColor} width={18} />
            </div>
          </Link>
        </li>
        <li className="py-2 px-3 hover:opacity-50">
          <Link className="flex justify-between items-center w-full" to={`/books/${bookId}/track`}>
            <div>Track progress</div>
            <div className="flex justify-end items-center">
              <TrackIcon className={fillIconColor} width={18} />
            </div>
          </Link>
        </li>
        <li className={`h-[0.5rem]  ${theme == 'dark' ? 'bg-[#1f1f23] ' : 'bg-[#f3f3f3]'}`}></li>
        <li className="py-2 px-3 border-b border-gray-500 hover:opacity-50">
          <Link className="flex justify-between items-center w-full" to={`/books/${bookId}/edit`}>
            <div>Edit book</div>
            <div className="flex justify-end items-center">
              <EditIcon className={fillIconColor} width={18} />
            </div>
          </Link>
        </li>
        <li className="py-2 px-3 hover:opacity-50">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => {
              if (deleteBookById) {
                deleteBookById([bookId]);
              }
              if (resetBooksSelection) {
                resetBooksSelection();
              }
            }}
          >
            <div>Delete book</div>
            <div className="flex justify-end items-center">
              <DeleteIcon className={fillIconColor} width={18} />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Popover;
