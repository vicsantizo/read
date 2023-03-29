import { Link, useLoaderData } from 'react-router-dom';
import { Book as BookType } from '../../../booksLibrary/models/book';
import { Book } from '../../../booksLibrary';
import { BookCategories } from '../bookCategories';
import { StatCard } from '../../../../components/common/statCard';
import './bookInformation.css';
import { BookDescription } from '../bookDescription';

export const BookInformation = () => {
  const book = useLoaderData();
  if (!(book instanceof BookType)) throw new Error("Book doesn't exist");
  const bookPages = book.getPages();
  const bookProgress = book.getTrackerLog().calculateBookCompletionPercentage(bookPages);

  return (
    <div className="bookinfo">
      <div className="bookinfo__book">
        <Book book={book} disableActions={true} />
        <BookCategories categories={book.getCategory()} />
      </div>

      <div className="bookinfo__stats">
        <StatCard title="Pages" text={book.getPages().toString()} />
        <StatCard title="Progress" text={bookProgress + '%'} />
      </div>

      <BookDescription description={book.getDescription()} />

      <div className="bookinfo__links">
        <Link to="/" title="Go Back">
          Back
        </Link>
      </div>
    </div>
  );
};

export default BookInformation;
