import { Book as BookType } from '../../models/book';
import { shortenText } from '../../../../utils/textFormat';
import { Link } from 'react-router-dom';
import { BookProgress } from './BookProgress';
import './book.css';

type BookProps = {
  book: BookType;
};

export const Book = ({ book }: BookProps) => {
  const title = shortenText(book.getTitle(), 30);
  const author = shortenText(book.getAuthor(), 30);
  const pages = book.getPages();
  const progress = book.getTrackerLog().calculateBookCompletionPercentage(pages);

  return (
    <div className="book-container">
      <Link to={`/books/${book.getId()}`} className="book" aria-label={`Book ${title} by ${author}`}>
        <span className="book__title">{title}</span>
        <span className="book__author">{author}</span>
      </Link>
      <BookProgress progress={progress} />
    </div>
  );
};

export default Book;
