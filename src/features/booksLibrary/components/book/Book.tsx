import { cutString } from '../../utils/utils';
import { BookProgress } from './BookProgress';
import './book.css';
import { useSelectionMark } from './useSelection';
import { useTheme } from '../../../../context/theme/useTheme';
import { OptionsButton } from './OptionsButton';
import { useState } from 'react';
import { Popover } from '../bookActionsPopover/Popover';

export type BookProps = {
  id: string;
  title: string;
  author: string;
  progress: number;
  booksSelection: Map<string, boolean>;
  setBooksSelection: (id: string) => void;
  disabled?: boolean;
  enableActions?: boolean;
  deleteBookById?: (id: string[]) => Promise<void>;
  resetBooksSelection?: () => void;
};

export const Book = (props: BookProps) => {
  const {
    title,
    author,
    progress,
    id,
    booksSelection,
    deleteBookById,
    setBooksSelection,
    resetBooksSelection,
    disabled,
    enableActions,
  } = props;
  const { bookButtonRef } = useSelectionMark(booksSelection, id);
  const { theme } = useTheme();

  const handleSelection = () => {
    bookButtonRef.current?.classList.toggle(`border`);
    setBooksSelection(id);
  };

  const [showActionsPopover, setShowActionsPopover] = useState<boolean>(false);
  const switchShowActions = () => {
    if (showActionsPopover) setShowActionsPopover(false);
    else setShowActionsPopover(true);
  };

  return (
    <div className="relative">
      <button
        disabled={disabled ?? false}
        ref={bookButtonRef}
        className={`book relative ${theme == 'light' && 'border-[navy]'}`}
        onClick={handleSelection}
      >
        <span className="book__title">{cutString(title, 65)}</span>
        <span className="book__author">{cutString(author, 25)}</span>
        <BookProgress progress={progress} />
      </button>
      {enableActions && (
        <>
          <OptionsButton execute={switchShowActions} />
          {showActionsPopover && (
            <Popover handleClickOut={switchShowActions} bookId={id} actions={{ deleteBookById, resetBooksSelection }} />
          )}
        </>
      )}
    </div>
  );
};

export default Book;
