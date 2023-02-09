import { Link, Params, useLoaderData } from 'react-router-dom';
import { useBook } from '../features/tracker/components/trackerForm/useBook';
import { Book } from '../features/booksLibrary/components/book';
import { useEffect, useState } from 'react';
import { StatCard } from '../features/tracker/components/statCard';
import { BookDescription, BookCategory } from '../features/bookInformation';

type ActionParams = {
  request: Request;
  params: Params;
};

export async function loader({ params }: ActionParams) {
  return params!.bookId;
}

export const BookInfo = () => {
  const bookId = useLoaderData() as string;
  const { bookData } = useBook(bookId);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="info container mx-auto flex h-[90vh] w-[100%] max-w-[400px] flex-col py-10">
      {isLoaded && (
        <div className="">
          <div className="info__book relative flex flex-col items-center justify-center">
            <Book
              id={bookData!.getIdentifier()}
              title={bookData!.getTitle()}
              author={bookData!.getAuthor()}
              enableActions={false}
              disabled={true}
              progress={bookData!.getTracker().calculateCompletion(bookData!.getPages())}
              booksSelection={new Map<string, boolean>()}
              setBooksSelection={(id: string) => id}
            />
            <div className="mb-5 mt-3 flex">
              {bookData!.getCategory() && <BookCategory category={bookData!.getCategory()} />}
            </div>
          </div>
          <div className="info__cards mb-7 flex flex-wrap items-center justify-center gap-2">
            <StatCard title={'Pages'} content={bookData!.getPages().toString()} />
            <StatCard title="Started" content={bookData!.getTracker().getStartDate()} />
            <StatCard
              title={'Progress'}
              content={bookData!.getTracker().calculateCompletion(bookData!.getPages()).toString() + '%'}
            />
          </div>
          <BookDescription description={bookData!.getDescription()} />
          <div className="info__back flex w-full">
            <Link
              to="/"
              title="Go Back"
              className="mt-[2.5rem] mb-8 w-[100%] rounded-md py-2 text-center text-sm hover:opacity-50"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
