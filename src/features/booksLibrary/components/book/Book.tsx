import { cutString } from '../../utils/utils';
import { BookProgress } from './BookProgress';
import './book.css';
import { useSelectionMark } from './useSelection';
import { useTheme } from '../../../../context/theme/useTheme';

export type BookProps = {
  id: string;
  title: string;
  author: string;
  progress: number;
  booksSelection: Map<string, boolean>;
  setBooksSelection: (id: string) => void;
  disabled?: boolean;
};

export const Book = (props: BookProps) => {
  const { title, author, progress, id, booksSelection, setBooksSelection, disabled } = props;
  const { bookButtonRef } = useSelectionMark(booksSelection, id);
  const { theme } = useTheme();

  const handleSelection = () => {
    bookButtonRef.current?.classList.toggle(`border`);
    setBooksSelection(id);
  };

  return (
    <button
      disabled={disabled ?? false}
      ref={bookButtonRef}
      className={`book relative ${theme == 'light' && 'border-[red]'}`}
      onClick={handleSelection}
    >
      <span className="book__title">{cutString(title, 65)}</span>
      <span className="book__author">{cutString(author, 25)}</span>
      <BookProgress progress={progress} />
    </button>
  );
};

export default Book;
