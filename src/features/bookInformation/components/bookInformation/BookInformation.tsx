import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { Book as BookType } from '../../../booksLibrary/models/book';
import { BookCover } from '../../../booksLibrary';
import { BookCategories } from '../bookCategories';
import { StatCard } from '../../../../components/common/statCard';
import { BookDescription } from '../bookDescription';
import { BookTrackingLogs } from '../bookTrackingLogs';
import { formatDate } from '../../../../utils/dateFormat';
import { Tracker } from '../tracker';
import './bookInformation.css';

export const BookInformation = () => {
  const book = useLoaderData();
  const { state } = useLocation();
  if (!(book instanceof BookType)) throw new Error("Book doesn't exist");
  const bookPages = book.getPages();
  const trackerLog = book.getTrackerLog();
  const bookProgress = trackerLog.calculateBookCompletionPercentage(bookPages);
  let startDate: Date | false | string = trackerLog.getStartDate();
  let completionDate: Date | false | string = trackerLog.getCompletionDate(bookPages);
  const bookPagesTag = book.getPages() + ' pages';

  if (startDate !== false) startDate = formatDate(startDate);
  else startDate = '...';

  if (completionDate !== false) completionDate = formatDate(completionDate);
  else completionDate = '...';

  return (
    <div className="bookinfo">
      <div className="bookinfo__book">
        <BookCover book={book} disableActions={true} />
        <BookCategories categories={[...book.getCategory(), bookPagesTag]} />
      </div>

      <div className="bookinfo__stats">
        <StatCard title="Started" text={startDate} />
        <StatCard title="Finished" text={completionDate} />
        <StatCard title="Progress" text={bookProgress + '%'} />
      </div>

      <BookDescription description={book.getDescription()} />

      <div className="bookinfo__tracker">
        <Tracker book={book} isOpen={state?.isOpen} />
        <BookTrackingLogs trackerLog={trackerLog} />
      </div>

      <div className="bookinfo__links">
        <Link to="/" title="Go Back">
          Back
        </Link>
      </div>
    </div>
  );
};

export default BookInformation;
