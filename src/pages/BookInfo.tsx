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
    <div className="info py-10 container mx-auto flex flex-col mx-auto w-[100%] max-w-[400px] h-[90vh]">
      {isLoaded && (
        <div className="">
          <h1 className="font-bold mb-8 text-center text-gray-500 text-lg">Book Information</h1>
          <div className="relative info__book flex flex-col justify-center items-center">
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
            <div className="flex mb-5 mt-3">
              {bookData!.getCategory() && <BookCategory category={bookData!.getCategory()} />}
            </div>
          </div>
          <div className="info__cards flex flex-wrap gap-2 justify-center items-center mb-7">
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
              className="mt-[2.5rem] text-sm text-center py-2 hover:opacity-50 rounded-md w-[100%] mb-8"
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