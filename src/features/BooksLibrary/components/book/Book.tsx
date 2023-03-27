import { Book as BookType } from '../../models/book';
import { shortenText } from '../../../../utils/textFormat';
import { Link } from 'react-router-dom';
import { BookProgress } from './BookProgress';
import { OptionsButton } from './OptionsButton';
import { useState } from 'react';
import { PopoverOptions } from './PopoverOptions';
import './book.css';

type BookProps = {
  book: BookType;
};

export const Book = ({ book }: BookProps) => {
  const [showOptionsPopover, setShowOptionsPopover] = useState<boolean>(false);
  const title = shortenText(book.getTitle(), 30);
  const author = shortenText(book.getAuthor(), 30);
  const id = book.getId();
  const pages = book.getPages();
  const progress = book.getTrackerLog().calculateBookCompletionPercentage(pages);

  const toggleOptionsPopover = () => {
    setShowOptionsPopover(!showOptionsPopover);
  };

  return (
    <div className="book-container">
      <OptionsButton execute={toggleOptionsPopover} />
      <Link to={`/books/${book.getId()}`} className="book" aria-label={`Book ${title} by ${author}`}>
        <span className="book__title">{title}</span>
        <span className="book__author">{author}</span>
      </Link>
      <BookProgress progress={progress} />
      {showOptionsPopover && <PopoverOptions bookId={id} handleClickout={toggleOptionsPopover} />}
    </div>
  );
};

export default Book;
