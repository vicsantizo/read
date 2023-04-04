import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { Book as BookType } from '../../../booksLibrary/models/book';
import { BookCover } from '../../../booksLibrary';
import { BookCategories } from '../bookCategories';
import { StatCard } from '../../../../components/common/statCard';
import { BookDescription } from '../bookDescription';
import { BookTrackingLogs } from '../bookTrackingLogs';
import { BookMessage } from '../bookMessage/BookMessage';
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

  if (startDate !== false) startDate = formatDate(startDate);
  else startDate = '...';

  if (completionDate !== false) completionDate = formatDate(completionDate);
  else completionDate = '...';

  return (
    <div className="bookinfo">
      <div className="bookinfo__book">
        <BookCover book={book} disableActions={true} />
        <BookCategories categories={book.getCategory()} />
        <p className="bookinfo__pages">{bookPages} pages</p>
      </div>

      <div className="bookinfo__stats">
        <StatCard title="Started" text={startDate} />
        <StatCard title="Finished" text={completionDate} />
        <StatCard title="Progress" text={bookProgress + '%'} />
      </div>

      <BookDescription description={book.getDescription()} />

      <div className="bookinfo__tracker">
        <h2 className="bookinfo__tracker-title">Tracking History</h2>
        <Tracker book={book} isOpen={state?.isOpen} />
        <BookMessage
          text={'the progress is measured by getting the last tracked entry and the total number of pages of the book'}
        />

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
